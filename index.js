//alert("SNEK");

var snakeX = 5;
var snakeY = 5;
var height = 30;
var width = 30;
var interval = 100;
var increment = 1;

var score = 0;
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //up=0 down=-1 left=1 right=2
var int;

//GAME START
function run(){
  init();
  int = setInterval(gameLoop, interval);
  //Runs game loop and updates every interval
}

//Creates variables for game start
function init(){
  createMap();
  createSnake();
  createFruit();
}

//CREATE MAP
function createMap(){
  document.write("<table>");
    for(var y = 0; y < height; y++){
      document.write("<tr>");
      for(var x = 0; x < width; x++){
        if(x == 0 || x == width-1 || y == 0 || y == height-1){
          document.write("<td class='wall' id='"+ x +"-"+ y +"'></td>");
        }else{
          document.write("<td class='blank' id='"+ x +"-"+ y +"'></td>");
        }
      }
      document.write("</tr>");
    }
  document.write("</table>");
};

//CREATE SNAKE
function createSnake(){ //Creates snake at (3,3)
  return set(snakeX, snakeY, "snake");
}

function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x, y, value){
    get(x,y).setAttribute("class", value);
}

//CREATE FRUIT
function random(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function getType(x,y){
  return get(x,y).getAttribute("class");
}

function createFruit(){
  var found = false;
  while(!found && (length < (width-2)*(height-2)+1)){
    var fruitX = random(1, width-1);
    var fruitY = random(1, height-1);
    if(getType(fruitX,fruitY) == "blank")
      found = true;
  }
  set(fruitX, fruitY, "fruit");
  fX = fruitX;
  fY = fruitY;
}

//Create direction
window.addEventListener("keypress", function key(event){
  var key = event.keyCode;
  if(key == 38 && direction != -1){ //up
    direction = 0;
  }else if(key == 40 && direction != 0){ //down
    direction = -1;
  }else if(key == 37 && direction != 2){ //left
    direction = 1;
  }else if(key == 39 && direction != 1){ //right
    direction = 2;
  }else if(!running){
    running = true;
  }
});

function gameLoop(){
  if(running && !gameOver){
    update();
  }else if(gameOver){
    clearInterval(Int);
  }
}

function update(){
  set(fX, fY, "fruit");
  tailUpdate();
  set(tailX[length], tailY[length], "blank");
  if(direction == 0){
    snakeY--;
  }else if(direction == -1){
    snakeY++;
  }else if(direction == 1){
    snakeX--;
  }else if(direction == 2){
    snakeX++;
  }
  set(snakeX, snakeY, "snake");
  for(var i = tailX.length-1; i>=0; i--){
    if(snakeX == tailX[i] && snakeY == tailY[i]){
      gameOver = true;
      nomDeath();
      score = 0;
      break;
    }
  }
  if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1){
    gameOver = true;
    wallDeath();
    score = 0;
    console.log("RESET");
  }else if(snakeX == fX && snakeY == fY){
    createFruit();
    length+=increment;
    score+=1
  }
  document.getElementById("score").innerHTML = "Wurst Extension: "+ score;
}

function tailUpdate(){
  for(var i = length; i > 0; i--){
    tailX[i] = tailX[i-1];
    tailY[i] = tailY[i-1];
  }
  tailX[0] = snakeX;
  tailY[0] = snakeY;
}

//MODAL 1
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

function wallDeath() {
    document.getElementById("deathMessage").innerHTML = "Walls are not edible."
    document.getElementById("highscore").innerHTML = "Score: " + score;
    modal.style.display = "block";
}
function nomDeath() {
    document.getElementById("deathMessage").innerHTML = "Canibalism is illegal."
    document.getElementById("highscore").innerHTML = "Score: " + score;
    modal.style.display = "block";
}

run();
