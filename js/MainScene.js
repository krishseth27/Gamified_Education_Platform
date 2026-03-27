import Player from "./player.js";

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
                    }
                } catch (e) {
                    console.warn("Failed to create layer:", layer.name, e.message);
                }
            }
        });
        
        this.matter.world.setBounds(0, 0, 2000, 2000);

        this.player = new Player({scene: this, x: 32, y: 32, texture: 'you', frame: 'knight_idle_1'});

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.cameras.main.setBounds(0, 0, 2048, 2048);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

        this.time.addEvent({
            delay: 5000,
            callback: this.triggerEncounter,
            callbackScope: this,
            loop: true
        });
    }

    triggerEncounter() {
        console.log("Encounter triggered! React will handle the UI.");
    }

    update(){
        this.player.update();
    }
}
