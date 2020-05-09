let lastTime = Date.now()
let circlePosX = 0;
const speed = 1

function setup() {
    createCanvas(1920, 1080, WEBGL);
    frameRate(60);
  }

  function draw() {
      const offset = Date.now()-lastTime
      circlePosX += offset*speed;

    background('#222222');
    //X-Cord, Y-Cord, Durchmesser
    circle(circlePosX,50,50);
    lastTime = Date.now();
  }

