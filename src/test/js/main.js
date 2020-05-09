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
  let acceleration = 1.3;
  let deceleration = 5;
  let tempo = 5;


  //Key Detection
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

//VelX, VelY, maxVel, acceleration, deceleration, tempo, playerPosX, playerPosY (WIP)
/*
function playerMovement(){
  if(KeyW === true) {
    velY += tempo*acceleration*-1;
    playerPosY += velY;
  }

  if(KeyS === true) {
    velY += tempo*acceleration;
    playerPosY += velY;
  }

  if(velY > maxVel) {velY = maxVel}
  if(velY < maxVel*-1) {velY = maxVel*-1}
  if(velY > 0) {velY -= deceleration}
}
*/

function drawPlayer(){
  fill(0);
  circle(playerPosX,playerPosY,50);
}

function keyPressed() {
  if (keyCode === W) {
    KeyW = true;
    ColorW = highlightColor;
  } else if (keyCode === A) {
    KeyA = true;
    ColorA = highlightColor;
  } else if (keyCode === S) {
    KeyS = true;
    ColorS = highlightColor;
  } else if (keyCode === D) {
    KeyD = true;
    ColorD = highlightColor;
  } else if (keyCode === SPACE) {
    KeySpace = true; 
    ColorSpace = highlightColor;
  } else if (keyCode === SHIFT) {
    KeyShift = true;
    ColorShift = highlightColor;
  }
}

function keyReleased() {
  if (keyCode === W) {
    KeyW = false;
    ColorW = defaultColor;
  } else if (keyCode === A) {
    KeyA = false;
    ColorA = defaultColor;
  } else if (keyCode === S) {
    KeyS = false;
    ColorS = defaultColor;
  } else if (keyCode === D) {
    KeyD = false;
    ColorD = defaultColor;
  } else if (keyCode === SPACE) {
    KeySpace = false;
    ColorSpace = defaultColor;
  } else if (keyCode === SHIFT) {
    KeyShift = false;
    ColorShift = defaultColor;
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

