var framerate = 0
var sound1,sound2,sound3
var score = 0 
var gameover, gameoverI
var restart, restartI
var gameState = "play"
var Cgroup,Ogroup
var trex, trexi
var ground,ground2,groundI
var cloud,cloudi
var obstacle,obstaclei1,obstaclei2,obstaclei3,obstaclei4,obstaclei5,obstaclei6


function preload(){
  trexi=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground2=loadImage("ground2.png")
  cloudi=loadImage("cloud.png")
  obstaclei1=loadImage("obstacle1.png")
  obstaclei2=loadImage("obstacle2.png")
  obstaclei3=loadImage("obstacle3.png")
  obstaclei4=loadImage("obstacle4.png")
  obstaclei5=loadImage("obstacle5.png")
  obstaclei6=loadImage("obstacle6.png")
  gameoverI=loadImage("gameOver.png")
  restartI=loadImage("restart.png")
  sound1=loadSound("checkPoint.mp3")
  sound2=loadSound("die.mp3")
  sound3=loadSound("jump.mp3")
  var dot = "phone"
  console.log("this is the dot value in function preload"+dot)
  
}
function setup(){
createCanvas(600,200)
   ground=createSprite(300,185,600,30)
  ground.addImage(ground2)
  groundI=createSprite(300,205,600,30)
  groundI.visible = false
  trex=createSprite(50,170,20,30)
  trex.addAnimation("running",trexi)
  trex.scale=0.5
 Ogroup=new Group()
 Cgroup=new Group() 
  restart=createSprite(300,150,70,70)
  gameover=createSprite(300,50,70,70)
  restart.addImage(restartI)
  restart.scale =0.5
  gameover.addImage(gameoverI)
  
  
  
}

function draw(){
  background("lightblue")
  if(gameState === "play"){
                           frameVelocity = frameCount - framerate
                        if(ground.x <0){
                                 ground.x = 600
                          }
                        if(keyDown("SPACE")&&trex.isTouching(ground)){   
                                 trex.velocityY = -10 
                                 sound3.play()
                          }  
                                 trex.velocityY = trex.velocityY + 0.5 
                                 clouds()
                                 obstacles()
                        if(Ogroup.isTouching(trex)){
                                 gameState = "end"
                                 sound2.play()
                          }
                                 restart.visible = false
                                 gameover.visible = false
                                 score = score + Math.round(frameVelocity/100) 
                                 ground.velocityX = -(6+score/100)
                        if(score%100==0 && score>0){
                                 sound1.play()
                          
                          }
                                  
     }
  if(gameState === "end"){
                                 Cgroup.setVelocityXEach (0)  
                                 ground.velocityX = 0
                                 Ogroup.setVelocityXEach (0)
                                 Ogroup.setLifetimeEach (50)
                                 restart.visible = true
                                 gameover.visible = true
                        if(mousePressedOver(restart)){
                                 gameState = "restart"
                          }
     }
  if(gameState === "restart"){
    Ogroup.destroyEach()
    Cgroup.destroyEach()
    framerate = frameCount
    score = 0
     gameState = "play"
    
     }
  trex.collide(groundI) 
  text("score = "+ score ,500,30)

  drawSprites()

 
}

function clouds(){
  if(frameCount %60 == 0){
       cloud = createSprite (620,random(0,70),20,10)
       cloud.addImage(cloudi)
       cloud.velocityX = -7
       clouds.lifetime = 120
       Cgroup.add(cloud)
     }
  
}
function obstacles(){
  if(frameCount %70 ==0){
      obstacle = createSprite(620,170,20,20)
  obstacle.velocityX = -(6+score/100) 
    switch(Math.round(random(1,6))){
           case 1:obstacle.addImage(obstaclei1)
                 break;
           case 2:obstacle.addImage(obstaclei2)
                 break;
           case 3:obstacle.addImage(obstaclei3)
                 break; 
           case 4:obstacle.addImage(obstaclei4)
                 break; 
           case 5:obstacle.addImage(obstaclei5)
                 break; 
           case 6:obstacle.addImage(obstaclei6)
                 break; 
           }
    obstacle.scale = 0.5
    obstacle.lifetime = 120
    Ogroup.add(obstacle)
  }
  
  
}


