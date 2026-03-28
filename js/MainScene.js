import Player from "./player.js";
import { EventBus } from "../src/game/EventBus.js";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene");
    }
    preload(){
      Player.preload(this);
        this.load.image('tiles','assets/images/tilemap.png');
        this.load.tilemapTiledJSON('map','assets/images/map.json');
    }
    create() {
        const map = this.make.tilemap({key:'map'});
        
        const activeTilesets = [];
        const baseTileset = map.addTilesetImage('tilemap', 'tiles');
        if (baseTileset) {
            activeTilesets.push(baseTileset);
        } else {
            console.warn("Failed to load required tileset: tilemap");
        }
        
        let layer1 = null;
        let wallLayer = null;
        map.layers.forEach(layer => {
            if (layer) {
                try {
                    const createdLayer = map.createLayer(layer.name, activeTilesets, 0, 0);
                    // Filter out bad GIDs to prevent WebGL crash for missing external tilesets
                    if (createdLayer) {
                        createdLayer.forEachTile(tile => {
                            if (tile.index > 0 && !activeTilesets.some(ts => ts.containsTileIndex(tile.index))) {
                                tile.index = -1; 
                            }
                        });
                        
                        if (layer.name === 'Tile Layer 1') {
                            layer1 = createdLayer;
                        } else if (layer.name === 'walls') {
                            wallLayer = createdLayer;
                        }
                    }
                } catch (e) {
                    console.warn("Failed to create layer:", layer.name, e.message);
                }
            }
        });
        
        this.matter.world.setBounds(0, 0, 2000, 2000);
        if (layer1) {
            layer1.setCollisionByProperty({collide:true});
            this.matter.world.convertTilemapLayer(layer1);
        }
        if (wallLayer) {
            wallLayer.setCollisionByProperty({collide:true});
            this.matter.world.convertTilemapLayer(wallLayer);
        }

        this.player = new Player({scene: this, x: 32, y: 32, texture: 'you', frame: 'knight_idle_1'});

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.cameras.main.setBounds(0, 0, 2048, 2048);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

        // Add 3 invisible trigger zones using Matter.js sensors:
        const createSensor = (x, y, w, h, label) => {
            const sensor = this.matter.add.rectangle(x, y, w, h, {
                isSensor: true,
                isStatic: true,
                label: label
            });
            return sensor;
        };

        const npcZone = createSensor(150, 150, 64, 64, 'npcZone');
        const battleZone = createSensor(400, 300, 64, 64, 'battleZone'); // Kept as fall-back or secondary trigger
        const bossZone = createSensor(700, 450, 100, 100, 'bossZone');
        
        // Sign boards
        const signZone1 = createSensor(350, 200, 80, 80, 'signZone1');
        const signZone2 = createSensor(600, 400, 80, 80, 'signZone2');

        let lastTriggerTime = 0;
        let lastSignTime = 0;
        
        this.matter.world.on('collisionactive', (event) => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;

                const isTrigger = (label) => bodyA.label === label || bodyB.label === label;
                const isPlayer = bodyA.gameObject === this.player || bodyB.gameObject === this.player;

                if (isPlayer) {
                    const now = this.time.now;
                    
                    // Interaction requires 'E' or Space for signs
                    if ((isTrigger('signZone1') || isTrigger('signZone2'))) {
                        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) || 
                            Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
                            if (now - lastSignTime > 1000) {
                                lastSignTime = now;
                                const text = isTrigger('signZone1') ? "Learning path this way!" : "Warning: Boss ahead!";
                                EventBus.emit('show-toast', text);
                            }
                        }
                    }

                    if (now - lastTriggerTime < 2000) continue; // Cooldown for main events

                    if (isTrigger('npcZone')) {
                        lastTriggerTime = now;
                        this.bouncePlayer();
                        EventBus.emit('npc-trigger');
                    } else if (isTrigger('battleZone')) {
                        lastTriggerTime = now;
                        this.bouncePlayer();
                        EventBus.emit('trigger-battle');
                    } else if (isTrigger('bossZone')) {
                        lastTriggerTime = now;
                        this.bouncePlayer();
                        EventBus.emit('boss-trigger');
                        // Optional camera drama
                        this.cameras.main.zoomTo(2.0, 1000, 'Sine.easeInOut');
                        this.time.delayedCall(2000, () => {
                            this.cameras.main.zoomTo(1.0, 1000, 'Sine.easeInOut');
                        });
                    }
                }
            }
        });

        EventBus.on('answer-correct', () => {
             // small flare
             const particles = this.add.particles(0, 0, 'tiles', {
                 frame: 0,
                 x: this.player.x,
                 y: this.player.y,
                 speed: 100,
                 lifespan: 800,
                 maxParticles: 10,
                 blendMode: 'ADD'
             });
        });

        EventBus.on('answer-wrong', () => {
             this.cameras.main.flash(500, 255, 0, 0);
        });

        // Wild encounter timer
        this.time.addEvent({
            delay: 8000, // Check every 8 seconds
            callback: this.triggerEncounter,
            callbackScope: this,
            loop: true
        });
    }

    triggerEncounter() {
        const now = this.time.now;
        // Don't trigger if recently had an event (give 5s breathing room)
        if (now - lastTriggerTime < 5000) return;
        
        // Only trigger if player is moving
        const velocity = this.player.body.velocity;
        if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
            // Rough logic for "forest area" vs "safe village area (x < 250, y < 250)"
            if (this.player.x > 250 || this.player.y > 250) {
                // 30% chance to trigger battle
                if (Math.random() < 0.3) {
                    lastTriggerTime = now;
                    EventBus.emit('trigger-battle');
                }
            }
        }
    }

    bouncePlayer() {
        const velX = this.player.body.velocity.x > 0 ? -2 : 2;
        const velY = this.player.body.velocity.y > 0 ? -2 : 2;
        this.player.setPosition(this.player.x + (velX * 10), this.player.y + (velY * 10));
    }

    update(){
        this.player.update();
    }
}
