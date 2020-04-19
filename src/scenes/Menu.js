class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('music', '././assets/cicada_back.mp3');

        this.load.audio('leaves', '././assets/leaves.mp3');
        this.load.audio('sfx_explosion', './assets/grab.mp3');
        this.load.audio('sfx_rocket', './assets/cloth_move.mp3');
    }

    create(){
      this.leaves = this.sound.add('leaves');
      this.music = this.sound.add('music');

        var musicConfig = {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        }

        this.music.play(musicConfig);
        //game.stage.backgroundColor = '#cabbaa';
        //menu display
        let menuConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '60px',
            backgroundColor: '#ae1f1f',
            color: '#cabbaa',
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
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, 60," RACKET PATROL", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = 30;

        
        let buttonConfig = {
          fontFamily: 'Georgia',
          fontStyle: 'bold',
          fontSize: '30px',
          backgroundColor: '#ae1f1f',
          color: '#161515',
          align: 'center',
          padding: {
              right: 10,
              left: 10,
              top: 5,
              bottom: 5,
          },
          fixedWidth: 150
      }
      this.easyButton = this.add.text(200, 250, 'Easy', buttonConfig);
      this.easyButton.setInteractive();

      this.easyButton.on('pointerdown', () => { 
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 20000    
          }
          this.sound.play('leaves');
          this.scene.start("playScene");
      });

      this.easyButton.on('pointerover', () => { 
          this.easyButton.setStyle({ fill: '#fff2d8'});
      });
      this.easyButton.on('pointerout', () => { 
          this.easyButton.setStyle({ fill: '#161515'});
      });
      
      
      this.hardButton = this.add.text(400, 250, 'Difficult', buttonConfig);
      this.hardButton.setInteractive();

      this.hardButton.on('pointerdown', () => { 
          
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 10000    
          }
          this.sound.play('leaves');
          this.scene.start("playScene");
      });

      this.hardButton.on('pointerover', () => { 
          this.hardButton.setStyle({ fill: '#fff2d8'});
      });
      this.hardButton.on('pointerout', () => { 
          this.hardButton.setStyle({ fill: '#161515'});
      });
        menuConfig.color = '#161515';
        menuConfig.backgroundColor = 'transparent';
        menuConfig.padding.bottom = 0;
        menuConfig.padding.top = 0;
        this.add.text(centerX, 130, 'Use <--> to move & (F) to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, 135 + textSpacer,"Select difficulty:", menuConfig).setOrigin(0.5);
        
    }
    
    update() {
        game.score = 0;
        
      }
    }