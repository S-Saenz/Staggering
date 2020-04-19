let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 384,
    backgroundColor: '#cabbaa',
    scene: [ Menu, Play , End ]
}
let game = new Phaser.Game(config);
// define game settings
game.score;
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 20000    
}
let keyF, keyLEFT, keyRIGHT;