export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let{scene, x,y,texture, frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider =Bodies.circle(this.x,this.y,6,{isSensor:false,label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,30,{isSensor:true,label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        // Interaction lock state
        this.isInteractionLocked = false;
        this.lastSafePosition = { x: this.x, y: this.y };
        this.resumeCooldown = false;
    }

    lockInteraction() {
        this.isInteractionLocked = true;
        this.lastSafePosition = { x: this.x, y: this.y };
        this.setVelocity(0, 0);
    }

    unlockInteraction() {
        this.resumeCooldown = true;
        this.setVelocity(0, 0);
        
        // Reset keyboard state
        if (this.inputKeys) {
            Object.values(this.inputKeys).forEach(key => {
                key.isDown = false;
                key.reset();
            });
        }
        
        // Short cooldown before fully unlocking
        this.scene.time.delayedCall(150, () => {
            this.isInteractionLocked = false;
            this.resumeCooldown = false;
        });
    }

    moveToSafePosition() {
        if (this.lastSafePosition) {
            this.setPosition(this.lastSafePosition.x, this.lastSafePosition.y);
            this.setVelocity(0, 0);
        }
    }

    static preload(scene){
        scene.load.atlas('you', 'assets/game_images/you.png', 'assets/game_images/you_atlas.json');
        scene.load.animation('you_anim', 'assets/game_images/you_anim.json');
    }

    get Velocity(){
        return this.body.velocity;
    }

    update(){
        // If locked, stop all movement and return immediately
        if (this.isInteractionLocked || this.resumeCooldown) {
            this.setVelocity(0, 0);
            this.anims.play('hero_idle', true);
            return;
        }

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

        // Update last safe position while moving normally
        if (Math.abs(playerVelocity.x) > 0.1 || Math.abs(playerVelocity.y) > 0.1) {
            this.lastSafePosition = { x: this.x, y: this.y };
        }

        if ((Math.abs(this.Velocity.x)>0.1) || (Math.abs(this.Velocity.y)>0.1)){
           this.anims.play('hero_walk',true);
        }else{
    this.anims.play('hero_idle',true);
        }
    }

}