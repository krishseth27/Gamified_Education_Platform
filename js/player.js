export default class player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let{scene, x,y,texture, frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.sceen.add.existing(this);

    }

    update(){
        this.player.anims.play('hero_walk',true);
        const speed = 2.5;
        let playerVelocity= new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x= -1;
        } else if (this.inputKeys.right.isDown){
            playerVelocity.x=1;
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y= -1;
        } else if (this.inputKeys.down.isDown){
            playerVelocity.y=1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
    }

}