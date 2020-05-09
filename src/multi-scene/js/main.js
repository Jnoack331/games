// draw a spinning box
// with width, height and depth of 50

const scenes = [
    mainMenu,
    jumpAndRun,
];

let currentScene;

function setup() {
    frameRate(60);
    switchScene(mainMenu);
}   
  
function draw() {
    currentScene.draw();
}

function switchScene(scene) {
    if (currentScene !== undefined) {
        currentScene.tearDown();
    }
    currentScene = scene;
    currentScene.setup();
}
