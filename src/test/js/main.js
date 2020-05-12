//Variablen etc.
  //Time Var.
  let lastTime = Date.now()
  const speed = 0;
  let timeCount = 0;
  let timeCountMs = 0;

  //Position Var
  let playerPosX = 200;
  let playerPosY = 500;

  //Player Movement PhyX
  let velX = 0;
  let velY = 0;
  let maxVel = 20;     
  let acceleration = 2;
  let deceleration = 10;
  let tempo = 10;
  let maxSpeed = 200;


  //Key Detection
  let wasdPressed = false;
  const W = 87;
  const A = 65;
  const S = 83;
  const D = 68;
  const SPACE = 32;
  const SHIFT = 16;
  let KeyW = false;
  let KeyA = false;
  let KeyS = false;
  let KeyD = false;
  let KeySpace = false;
  let KeyShift = false;

  //Key Color
  const defaultColor = 50;
  const highlightColor = 200;
  let ColorW = ColorA = ColorS = ColorD = ColorSpace = ColorShift = defaultColor;


//Code
function setup() {
    createCanvas(1920, 1080);
    frameRate(60);
    textSize(50);
    textAlign(LEFT, TOP);
    setInterval(()=>{
      timeCount++
    },1000);
  }

  function draw() {
      const offset = Date.now()-lastTime;
      //playerPosX += offset*speed;

    background('#222222');
    displayTime();
    displayKeys();

//X-Cord, Y-Cord, Durchmesser - Player
    drawPlayer();
    playerMovement();
    displayVelX();
    displayVelY();
    lastTime = Date.now();
  }

//Anzeigen der Zeit
function displayTime(){
  fill(255, 255, 255);
  text(timeCount, 10, 10);
}

function displayVelX(){
  fill(255, 255, 255);
  text(velX, 100, 10);
}

function displayVelY(){
  fill(255, 255, 255);
  text(velY, 200, 10);
}

//VelX, VelY, maxVel, acceleration, deceleration, tempo, playerPosX, playerPosY, maxSpeed (WIP)
function playerMovement(){
    //if((velY != 0) || (velX != 0) || (wasdPressed === true)) decrease number of tests
      if(KeyW === true) {
        velY += (tempo + (acceleration*acceleration))*-1;
        if(velY < 0) {playerPosY += velY/10;}
      } else if((KeyW === false) && (velY < 0)){
        if(velY < 0) {
          playerPosY += velY/10;
          if(velY > deceleration*-1){
            velY -= velY;
          } else if(velY < 0){
            velY += deceleration;
          }
        }
      }

      if(KeyA === true) {
        velX += (tempo + (acceleration*acceleration))*-1;
        if(velX < 0) {playerPosX += velX/10;}
      } else if((KeyA === false) && (velX < 0)){
        if(velX < 0) {
          playerPosX += velX/10;
          if(velX > deceleration*-1){
            velX -= velX;
          } else if(velX < 0){
            velX += deceleration;
          }
        }
      } 

      if(KeyS === true) {
        velY += (tempo + (acceleration*acceleration));
        if(velY > 0) {playerPosY += velY/10;}
      } else if((KeyS === false) && (velY > 0)){
        if(velY > 0) {
          playerPosY += velY/10;
          if(velY < deceleration){
            velY -= velY;
          } else if(velY > 0){
            velY -= deceleration;
          }
        }
      }

      if(KeyD === true) {
        velX += (tempo + (acceleration*acceleration));
        if(velX > 0) {playerPosX += velX/10;}
      } else if((KeyD === false) && (velX > 0)){
        if(velX > 0) {
          playerPosX += velX/10;
          if(velX < deceleration){
            velX -= velX;
          } else if(velX > 0){
            velX -= deceleration;
          }
        }
      } 

    //cap at max Speed
    if(velY < -maxSpeed){
      velY -= (velY + maxSpeed);
    }
    if(velY > maxSpeed){
      velY -= (velY - maxSpeed)
    }
    if(velX < -maxSpeed){
      velX -= (velX + maxSpeed)
    }
    if(velX > maxSpeed){
      velX -= (velX - maxSpeed)
    } 



}

function drawPlayer(){
  fill(0);
  circle(playerPosX,playerPosY,50);
}

function keyPressed() {
  if (keyCode === W) {
    KeyW = true;
    ColorW = highlightColor;
    wasdPressed = true;
  } else if (keyCode === A) {
    KeyA = true;
    ColorA = highlightColor;
    wasdPressed = true;
  } else if (keyCode === S) {
    KeyS = true;
    ColorS = highlightColor;
    wasdPressed = true;
  } else if (keyCode === D) {
    KeyD = true;
    ColorD = highlightColor;
    wasdPressed = true;
  } else if (keyCode === SPACE) {
    KeySpace = true; 
    ColorSpace = highlightColor;
    wasdPressed = true;
  } else if (keyCode === SHIFT) {
    KeyShift = true;
    ColorShift = highlightColor;
    wasdPressed = true;
  }
}

function keyReleased() {
  if (keyCode === W) {
    KeyW = false;
    ColorW = defaultColor;
    wasdPressed = false;
  } else if (keyCode === A) {
    KeyA = false;
    ColorA = defaultColor;
    wasdPressed = false;
  } else if (keyCode === S) {
    KeyS = false;
    ColorS = defaultColor;
    wasdPressed = false;
  } else if (keyCode === D) {
    KeyD = false;
    ColorD = defaultColor;
    wasdPressed = false;
  } else if (keyCode === SPACE) {
    KeySpace = false;
    ColorSpace = defaultColor;
    wasdPressed = false;
  } else if (keyCode === SHIFT) {
    KeyShift = false;
    ColorShift = defaultColor;
    wasdPressed = false;
  }
}

function displayKeys() {
  fill(ColorW);
  square(80, 940, 50);
  fill(ColorA);
  square(20, 1000, 50);
  fill(ColorS);
  square(80, 1000, 50);
  fill(ColorD);
  square(140, 1000, 50);
  fill(ColorSpace);
  rect(200, 1000, 400, 50);
  fill(ColorShift);
  rect(140, 940, 100, 50);
}

