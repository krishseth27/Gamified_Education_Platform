export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let{scene, x,y,texture, frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider =Bodies.circle(this.x,this.y,12,{isSensor:false,label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,30,{isSensor:true,label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('you','assets/images/you.png','assets/images/you_atlas.json');
        scene.load.animation('you_anim','assets/images/you_anim.json');
    }

    get Velocity(){
        return this.body.velocity;
    }

    update(){
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
        if ((Math.abs(this.Velocity.x)>0.1) || (Math.abs(this.Velocity.y)>0.1)){
           this.anims.play('hero_walk',true);
        }else{
    this.anims.play('hero_idle',true);
        }
    }

}