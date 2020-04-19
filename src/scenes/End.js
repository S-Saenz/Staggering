class End extends Phaser.Scene {
    constructor(){
        super("endScene");
    }
    
    init(data){
        console.log('init', data.score);
        this.finalScore = data.score;
    }
    
    preload() {
        // load audio
        if(game.score<5){
            this.load.image('back','././assets/end_low.png');
        } else if(game.score < 15){
            this.load.image('back','././assets/end_mid.png');
        } else {
            this.load.image('back','././assets/end_high.png');
        }
        this.load.audio('sfx_explosion', './assets/grab.mp3');
        this.load.audio('sfx_rocket', './assets/cloth_move.mp3');
    }


    create(){
        //game.stage.backgroundColor = '#cabbaa';
        //menu display
        this.back = this.add.tileSprite(0, 0, 750, 384, 'back').setOrigin(0, 0);

        let endConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '60px',
            backgroundColor: 'transparent',
            color: '#fff2d8',
            align: 'right',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let textSpacer = 64;

        this.add.text(centerX, 30,"score:" + game.score, endConfig).setOrigin(0.5);
        
        let buttonConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '30px',
            backgroundColor: 'transparent',
            color: '#fff2d8',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.menuButton = this.add.text(200, 100, 'menu', buttonConfig);
        this.menuButton.setInteractive();

        this.menuButton.on('pointerdown', () => { 
            this.scene.start("menuScene");
        });

        this.menuButton.on('pointerover', () => { 
            this.menuButton.setStyle({ fill: '#cabbaa'});
        });
        this.menuButton.on('pointerout', () => { 
            this.menuButton.setStyle({ fill: '#fff2d8'});
        });
        
        
        this.playButton = this.add.text(400, 100, 'restart', buttonConfig);
        this.playButton.setInteractive();

        this.playButton.on('pointerdown', () => { 
            this.scene.start("playScene");
        });

        this.playButton.on('pointerover', () => { 
            this.playButton.setStyle({ fill: '#cabbaa'});
        });
        this.playButton.on('pointerout', () => { 
            this.playButton.setStyle({ fill: '#fff2d8'});
        });
    }
    
    update() {
      }
}