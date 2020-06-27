let drawing = [];
let currentPath = [];
let canDraw = false;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvas-holder');
  pixelDensity(1);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  var clearBtn = select("#clear-button");
  var detectBtn = select("#detect-button");
  clearBtn.mousePressed(clearCanvas);
  detectBtn.mousePressed(test);
  background(200, 50, 100);
  
}

function startPath() {
  canDraw = true;
  currentPath = [];
  drawing.push(currentPath);
  //console.log(drawing);
}
function endPath(){
  canDraw = false;
}

function draw() {
  if (canDraw) {
    let point = { x: mouseX, y: mouseY };
    currentPath.push(point);
    noFill();
    stroke(255);
    strokeWeight(10);
    for (let i = 0; i < drawing.length; i++){
      let path = drawing[i];
      beginShape();
      for (let j = 0; j < path.length; j++){
        vertex(path[j].x, path[j].y);
      }
      endShape();
    }
  }
}

function clearCanvas() {
  drawing.length = 0;
  currentPath.length = 0;
  clear();
  background(200, 50, 100);
}

function test() {
  loadPixels();
  let d = pixelDensity();
  //console.log(pixels.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = 4 * (x + y * width);
      if (pixels[index] == 255 && pixels[index + 1] == 255 && pixels[index + 2] == 255 && pixels[index + 3] == 255) {
        continue;
      }
      pixels[index] = 0;
      pixels[index+1] = 0;
      pixels[index+2] = 0;
      pixels[index+3] = 255;
    }
  }
  updatePixels();
}