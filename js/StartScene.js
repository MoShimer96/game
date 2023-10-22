class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('start', './assets/start.png');
    this.load.audio('soundtrack', './assets/the-office-theme-song_01.mp3');
  }

  create() {
    const screen = this.add.image(0, 0, 'start').setOrigin(0);
    let sfx = this.sound.add('soundtrack');
    sfx.play();

    // aloita!!
    this.input.keyboard.on('keydown', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}

