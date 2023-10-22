let score = 0;

var mouse;
const gameState = {
  numCoordinates: {},
};
let randomCoord;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('scott', './assets/scott.png');
    this.load.image('pretzel', './assets/pretzel.png');
    this.load.image('toby', './assets/toby.png');
    this.load.image('paper', './assets/paper.png');
    this.load.image('dwight', './assets/dwight.png');


    this.load.audio('michael', './assets/michael_3.mp3');
    this.load.audio('pew', './assets/pew-pew-lame-sound-effect.mp3');

    
    

  }

  create() {
    let michael = this.sound.add('michael');
    let pew  = this.sound.add('pew')
    let scoreText = this.add.text(140, 610, `Pretzels: ${score}`, { fontSize: '25px', fill: '#fff' });

    // Pelaaja eli Scott
    gameState.player = this.physics.add.sprite(240, 500, 'scott').setScale(.1);
    this.physics.world.setBounds(0, 0, 480, 600);   
    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;

    // Kerättävät pretzelit
    randomCoord = assignCoords();
    gameState.food = this.physics.add.sprite(randomCoord.x, randomCoord.y, 'pretzel').setScale(.05);

    // viholliset eli toby ja dwight
    gameState.enemies = this.physics.add.group();
    gameState.dwight = this.physics.add.group();

     
    this.physics.add.overlap(gameState.player, gameState.food, () => {
       
      gameState.food.disableBody();
     pew.play();
      delete gameState.numCoordinates[`x${gameState.food.x}y${gameState.food.y}`];
      randomCoord = assignCoords();
       
      gameState.food.enableBody(true, randomCoord.x, randomCoord.y);
      
      score += 1;
      scoreText.setText(`Pretzel: ${score}`);



      randomCoord = assignCoords();
      if (randomCoord.x === gameState.food.x || randomCoord.y === gameState.food.y){
        randomCoord = assignCoords();
        gameState.enemies.create(randomCoord.x, randomCoord.y, 'toby').setScale(.1);
      } else {
        gameState.enemies.create(randomCoord.x, randomCoord.y, 'toby').setScale(.1);
      }
       
    
      randomCoord = assignCoords();
      if (randomCoord.x === gameState.food.x || randomCoord.y === gameState.food.y){
        randomCoord = assignCoords();
        gameState.dwight.create(randomCoord.x, randomCoord.y, 'dwight').setScale(.1);
        michael.play();
      } else { 
        gameState.dwight.create(randomCoord.x, randomCoord.y, 'dwight').setScale(.1);
        michael.play();
      }
      
      
       
      gameState.dwight.setVelocityX(10*score)
      
      
    });

    
    // Collision scott ja toby
    this.physics.add.overlap(gameState.player, gameState.dwight, () => this.endGame());

    // Collision scott ja toby  
    this.physics.add.collider(gameState.player, gameState.enemies, () => this.endGame());

    // Helper function to return an object containing evenly spaced x and y coordinates:
    function generateRandomCoords () {
      const randomX = Math.floor(Math.random() * 5) * 75 + 25
      const randomY = Math.floor(Math.random() * 5) * 75 + 25
      return { x: randomX, y: randomY }
    }

    // Helper function that returns one set of coordinates not in gameState.numCoordinates
    function assignCoords () {
      let assignedCoord = generateRandomCoords();

       
       
        assignedCoord = generateRandomCoords()
       

      gameState.numCoordinates[assignedCoord.x,assignedCoord.y]  

      return assignedCoord;
    }



    gameState.papaer = this.physics.add.group();

    this.physics.add.collider(gameState.enemies, gameState.paper, (paper, toby) => {
      paper.destroy();
      toby.destroy();
      
    });
    
     
    

  }

  update() {
    
    //Scottin liikuttaminen näppäimistön avulla
    const cursors = this.input.keyboard.createCursorKeys();
    const rightArrow = cursors.right.isDown;
    const leftArrow = cursors.left.isDown;
    const upArrow = cursors.up.isDown;
    const downArrow = cursors.down.isDown;
    const sKEY = this.input.keyboard.addKey('s');
    if (rightArrow) {
      gameState.player.x += 5
    } else if (leftArrow) {
      gameState.player.x -= 5
    } else if (upArrow) {
      gameState.player.y -= 5
    } else if (downArrow) {
      gameState.player.y += 5
    }



    //amupuminen hiiren avulla
    mouse=this.input.mousePointer;

    //mouse clicked
if(mouse.isDown){
  
  let cannonball=this.physics.add.sprite(gameState.player.x,gameState.player.y,'paper').setScale(.1);
    
   this.physics.moveTo(cannonball,mouse.x,mouse .y,500);
   this.physics.add.collider(gameState.enemies, cannonball, (toby, paper) => {
     
    toby.destroy();
    paper.destroy();
    
  });
   
}

 
 
 

    
    const ScottXCoord = gameState.player.x;
    const ScottYCoord = gameState.player.y;
    if (ScottXCoord >= 448 || ScottXCoord <= 32) {
      this.endGame();
    }
    if (ScottYCoord >= 568 || ScottYCoord <= 32) {
      this.endGame();
    }




     
    




    
    
    
  }

  
  endGame () {
    this.physics.pause();
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
      if (progress > .5) {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
      }
    });
  }
}

