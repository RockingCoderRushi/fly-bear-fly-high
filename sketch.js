var invisibleground;
var bg, backgroundimg;

var pancakes,pancakegroup;

var bear1img,bear1;

var obstaclesgroup;
var obstacle1,obstacle2;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var resetimage,endimage;

var reset,end1
var jumpsound;
var gameoversound;

function preload(){
 backgroundimg = loadImage("backgroundimg.png")
  bear1img = loadImage("bear.png")
  obstacle1 = loadImage("rocks_05.png")
  obstacle2 = loadImage("rocks-04.png")
  pancakes = loadImage("pancake.png")
  resetimage = loadImage("textGetReady.png")
  endimage = loadImage("textGameOver.png")
  jumpsound = loadSound("jump.wav")
  gameoversound = loadSound("end.wav")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  
  invisibleground = createSprite(0,displayHeight,2*displayWidth,20)
  invisibleground.visible= false

 // bg = createSprite(2000,0,4*width,height)
 // bg.addImage(backgroundimg)
  //bg.x = bg.width
 // bg.scale = 8

  bear1 = createSprite(60,450)
  bear1.addImage(bear1img)
 bear1.scale = 0.2
  
 obstaclesgroup = createGroup()
 pancakegroup = createGroup()
 score = 0;

 end1 = createSprite(370,300)
 end1.addImage(endimage)
 end1.visible= false

 reset = createSprite(370,400)
 reset.addImage(resetimage)
 reset.visible = false
}

function draw() {
 background(backgroundimg)

 
if(gameState === PLAY){
 //invisibleground.velocityX = -8;
  // if(invisibleground.x<0 ){
    
  //   invisibleground.x = invisibleground.width/2
  // }

//  obstaclesgroup.velocityX = -(4 + 3* score/100)
  
  if(keyDown("space")&&bear1.collide(invisibleground)) {
    jumpsound.play()
    
    bear1.velocityY = -22;
   
}

bear1.velocityY = bear1.velocityY + 0.6
 bear1.collide(invisibleground)

 
// score = score + Math.round(frameCount / 60);

 spawnObstacles()
 spawnPancake()
 if(pancakegroup.isTouching(bear1)){
  score = score + 50
 pancakegroup.destroyEach()
}
 if(obstaclesgroup.isTouching(bear1)){
  gameState = END;
  gameoversound.play()
 }
 
}
 
 else if(gameState === END){
   bear1.velocityX = 0
   bear1.velocityY = 0

   obstaclesgroup.setLifetimeEach(-1);
   pancakegroup.setLifetimeEach(-1);
     
     obstaclesgroup.setVelocityXEach(0);
     pancakegroup.setVelocityXEach(0);

     end1.visible = true
     reset.visible = true

     
     if(mousePressedOver(reset)) {
      resetgame();
    }
 }


 
  drawSprites();
  textSize(40)
  fill("black")
  stroke("blue")
  strokeWeight(2)
  text("Score :" + score, 400, 200)
  
 // startsound = loadSound("sound.mp3")
 //frunction draw(){startsound.play()}

}

function resetgame(){
  gameState = PLAY

  reset.visible = false
  end1.visible = false

  obstaclesgroup.destroyEach()
  pancakegroup.destroyEach()

  score = 0;
}
function spawnObstacles(){
  if(frameCount % 200=== 0){
   var obstacle = createSprite(displayWidth,600,50,50)
  

  // obstacle.velocityX = -(2 + score/100)
   obstacle.velocityX = -(6 + score/100);
   var rand = Math.round(random(1,2))
   switch(rand){
     case 1: obstacle.addImage(obstacle1)
     obstacle.setCollider("circle",0,0,140)
     obstacle.scale = 0.7
             break;
     case 2 :obstacle.addImage(obstacle2)
     obstacle.setCollider("circle",0,0,160)
     obstacle.scale = 0.5
             break;
        default: break;
   }
  
   obstacle.lifetime = 300;

   obstaclesgroup.add(obstacle);
  }
}

function spawnPancake(){
  if(frameCount % 150=== 0){
   var pancake = createSprite(displayWidth-350,400)
  // obstacle.velocityX = -(6 + score/100)
  pancake.addImage(pancakes)
   pancake.velocityX = -6.5
   pancake.y = Math.round(random(400,displayHeight-200))
   
   pancake.scale = 0.2
   pancake.lifetime = 300;
  
   pancakegroup.add(pancake)

  }
  }
