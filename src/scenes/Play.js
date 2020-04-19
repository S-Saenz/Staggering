class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.audio('stag_fly', '././assets/stag_fly.mp3');

        this.load.image('mimas', '././assets/sun.png');
        this.load.image('lining', '././assets/lining.png');
        this.load.image('logs', '././assets/logs.png');
        // load images/tile sprites
        this.load.image('rocket', '././assets/hand.png');
        this.load.image('spaceship', '././assets/beetle.png');
        this.load.image('starfield', '././assets/clouds.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/hand_anim.png', {frameWidth: 77, frameHeight: 89, startFrame: 0, endFrame: 3});
    }

    create(){
        this.stag_fly = this.sound.add('stag_fly');

        var musicConfig = {
          mute: false,
          volume: 0.5,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
        }

        this.stag_fly.play(musicConfig);
        // place tile sprite
        this.mimas = this.add.tileSprite(0, 0, 750, 384, 'mimas').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 750, 384, 'starfield').setOrigin(0, 0);
        this.logs = this.add.tileSprite(0, 0, 750, 384, 'logs').setOrigin(0, 0);
        this.lining = this.add.tileSprite(0, 0, 750, 384, 'lining').setOrigin(0, 0);
        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2,game.config.height-20, 'rocket')/*.setScale(0.5, 0.5).setOrigin(0, 0)*/;
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // add spaceships (x2)
        this.sound.add('stag_fly');
        this.ship01 = new Spaceship(this, game.config.width + 192, 20, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width, 100, 'spaceship', 0, 10).setOrigin(0,0);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '30px',
            backgroundColor: '#ae1f1f',
            color: '#cabbaa',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        this.scoreDisplay = "score: " + this.p1Score;
        this.scoreLeft = this.add.text(550, 54, this.scoreDisplay, scoreConfig);
        
        // game over flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.stag_fly.stop(); 
            this.scene.start("endScene", { score: this.p1Score });  
        }, null, this);
        
    }

    start(){
        
    }
    update(){
        this.starfield.tilePositionX -= 0.3;
        this.mimas.tilePositionX -= 0.05;
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1Rocket.visible = false;
            this.shipExplode(this.ship02);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1Rocket.visible = false;
            this.shipExplode(this.ship01);
        }
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x2)
            this.ship02.update();
        } 
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width/2 > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height/2 + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        game.score++;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {  
            this.p1Rocket.visible = true;  // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "score: " + this.p1Score;
        this.sound.play('sfx_explosion');       
    }
}