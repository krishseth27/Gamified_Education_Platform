import MainScene from "./MainScene.js";

const matterCollisionPlugin =
    (window.PhaserMatterCollisionPlugin && window.PhaserMatterCollisionPlugin.default) ||
    window.PhaserMatterCollisionPlugin;

if (!matterCollisionPlugin) {
    console.warn('PhaserMatterCollisionPlugin not found. Check the script tag in index.html.');
}

const config = {
    width:512,
    height:512,
    backgroundColor: '#fcfbbc',
    type: Phaser.AUTO,
    parent:'survival-game',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 2
    },
    physics: {
        default:'matter',
        matter: {
            debug: false,
            gravity:{y:0},
        }
    },
    plugins:{
        scene:[
            {
                plugin: matterCollisionPlugin,
                key: 'matterCollision',
                mapping:'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);
