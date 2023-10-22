class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' })
  }

  preload() {
    this.load.image('end', './assets/end.png');
    this.load.audio('ending', './assets/nooo-god-0.mp3');
  }

  create() {

    let ending = this.sound.add('ending');
    ending.play();
    screen = this.add.image(0, 0, 'end').setOrigin(0);

    // Reset global variables
    score = 0;
 
    // Reset sprite positions
    gameState.numCoordinates = {};

    this.input.keyboard.on('keydown', () => {
      this.scene.stop('EndScene');
      this.scene.start('GameScene');
    });
  }
}



