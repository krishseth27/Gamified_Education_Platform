import Player from "./player.js";

export default class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene");
    }
    preload(){
      Player.preload(this);
    }
    create() {
        console.log("create");
        
        this.matter.world.setBounds(0, 0, 2000, 2000);

        this.player = new Player({scene: this, x: 1000, y: 1000, texture: 'you', frame: 'knight_idle_1'});
        let textPlayer = new Player({scene: this, x: 1200, y: 1200, texture: 'you', frame: 'knight_idle_1'});

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.cameras.main.setBounds(0, 0, 2000, 2000);
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
