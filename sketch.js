//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, doImg1;
var fedTime,lastFed;
var foodObj;
var feed, addFood;
function preload()
{
	dogImg=loadImage("images/dogImg.png");
	dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database();
  
  dog= createSprite(800,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.3;
  
  foodObj=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);



feed= createButton("Feed the Dog");
feed.position(700,100);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,100);
addFood.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
	lastFed=data.val();
})
drawSprites();
}

function readStock(data){
	foodS=data.val();
	foodObj.updateFoodStock(foodS)
}

function addFoods(){
foodS++;
database.ref('/').update({
	Food:foodS
})	
}

function feedDog() {
	dog.addImage(dogImg1);
	foodObj.updateFoodStock(foodObj.getFoodStock(-1));
	database.ref('/').update({
		Food:foodObj.getFoodStock(),
		FeedTime:hour()
	})
}


