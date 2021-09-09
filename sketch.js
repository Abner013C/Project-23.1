//declaracion de variables
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var bcg

//constantes
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	//carga de imagenes
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	bcg= loadImage("bcg2.jpg");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
    //sprite del paquete
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	//sprite del helicoptero
	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	//sprite del suelo
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);

	//Crea el Suelo
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(bcg);
 
  packageSprite.x= helicopterSprite.x //packageBody.position.x
  packageSprite.y= packageBody.position.y //helicopterSprite.y

  if(keyIsDown(LEFT_ARROW)){
	  helicopterSprite.x= helicopterSprite.x-10;
  }
  if(keyIsDown(RIGHT_ARROW)){
	  helicopterSprite.x= helicopterSprite.x+10;
  }
  if(keyIsDown(DOWN_ARROW)&& helicopterSprite.x>250 && helicopterSprite.x<500){
	  Matter.Body.setStatic(packageBody,false);
  }
  if(packageSprite.y> 200){
	packageSprite.x= packageBody.position.x
  }
  Matter.Body.translate(packageBody,{x:0,y:0});

  drawSprites();
}