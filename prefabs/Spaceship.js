class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track firing status
        this.points = 1;
        this.vertMaxMove = 10;
        this.vertMoveCounter = Phaser.Math.Between(0-this.vertMaxMove,this.vertMaxMove);
        this.tooFar =false;
    }
    update(){
        //move ship left
        this.vertMove = Phaser.Math.Between(0,game.settings.spaceshipSpeed);
        if(this.vertMoveCounter == 0){
            this.vertMoveCounter = 1;
        }
        if(this.vertMoveCounter >0){
            this.y -= this.vertMoveCounter/(this.vertMaxMove*1.2);
            this.vertMoveCounter++;
            if(this.vertMoveCounter == this.vertMaxMove){
                this.vertMaxMove = Phaser.Math.Between(10,50);
                this.vertMoveCounter = -1;
            }
        }
        
        if(this.vertMoveCounter <0){
            this.y += (-this.vertMoveCounter)/(this.vertMaxMove*1.2);
            this.vertMoveCounter--;
            if(this.vertMoveCounter == -this.vertMaxMove){
                this.vertMaxMove = Phaser.Math.Between(10,30);
                this.vertMoveCounter = 1;
            }
        }
        this.x -= game.settings.spaceshipSpeed;
        // warp around
        if(this.y >= 100 || this.y<= 10){
            this.tooFar = true;
        }
        if(this.x <= 0-this.width){
            console.log(this.y)
            this.x = game.config.width;
            if(this.tooFar){
                this.tooFar = false;
                this.y = 80;
            }
        }
        if(this.tooFar && this.x == game.config.width){
            this.tooFar = false;
            this.y = 80;
        }
    }

    reset(){
        this.x = game.config.width;
    }    
}