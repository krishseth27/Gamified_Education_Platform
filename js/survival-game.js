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
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent:'survival-game',
    scene: [MainScene],
    scale:{
        zoom:2,
    },
    physics: {
        default:'matter',
        matter: {
            debug: true,
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
