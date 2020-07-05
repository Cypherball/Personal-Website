function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function loadmodel() {
  return await tf.loadLayersModel(modelURL);
}
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
  }
});

let canvasWidth = 400;
let canvasHeight = 400;
let _strokeW = 15;
let drawing = [];
let currentPath = [];
let canDraw = false;
let ajaxRequestAccept = false;
//const model = loadmodel();
let model;

async function preload() {
  //load model
  console.log("Loading Model...");
  model = await tf.loadLayersModel(modelURL).then(console.log("Model loaded!"));
}

function setup() {
  ajaxRequestAccept = false;
  $("#ocr-loading").hide();
  $('#predict-button').attr("disabled", true);
  setCanvasDims();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-holder');
  pixelDensity(1);
  canvas.mousePressed(startPath);
  canvas.touchStarted(startPath);
  canvas.mouseReleased(endPath);
  canvas.touchEnded(endPath);
  let clearBtn = select("#clear-button");
  let predictBtn = select("#predict-button");
  clearBtn.mousePressed(resetCanvas);
  predictBtn.mousePressed(predict);
  background(0, 0, 0); 
  $("canvas").css({ "cursor": "crosshair" }); //cursor style to crosshair
  //disable scroll and swipe inside container
  $("canvas").bind("wheel mousewheel", function (e) { e.preventDefault() });
  $("canvas")[0].addEventListener("touchstart",  function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchmove",   function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchend",    function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchcancel", function (event) { event.preventDefault() })
  noLoop();
}

function startPath() {
  loop();
  canDraw = true;
  $('#predict-button').attr("disabled", false);
  currentPath.splice(0, currentPath.length);
  drawing.push(currentPath);
}

function endPath() {
  canDraw = false;
  noLoop();
}

let draw_img = false;
let img;

function draw() {
  if (canDraw) {
    let point = { x: mouseX, y: mouseY };
    currentPath.push(point);
    noFill();
    stroke(255);
    strokeWeight(_strokeW);
    for (let i = 0; i < drawing.length; i++){
      let path = drawing[i];
      beginShape();
        for (let j = 0; j < path.length; j++){
          curveVertex(path[j].x, path[j].y);
        }
      endShape();
    }
  }
  if(draw_img)
    image(img, 0, 0);
}


function resetCanvas() {
  draw_img = false;
  setCanvasDims();
  resizeCanvas(canvasWidth, canvasHeight);
  drawing.splice(0, drawing.length);
  currentPath.splice(0, currentPath.length);
  clear();
  ajaxRequestAccept = false;
  $('#predict-button').attr("disabled", true);
  background(0, 0, 0);
  $("#ocr-loading").hide();
  $("#tfjs-response").html("");
  noLoop();
}



async function predict() {
  $('#predict-button').attr("disabled", true);
  $("#tfjs-response").html("");
  $("#ocr-loading").show();
 
  let imagePixels = getResizedImage();

  //draw_img = true;
  
  tfImage = tf.tensor(imagePixels, [1, 28, 28, 1], 'float32');
  const prediction = await model.predict([tfImage]).array().then(function (scores) {
    tf.dispose(tfImage);
    scores = scores[0];
    predicted = scores.indexOf(Math.max(...scores));
    //console.log(predicted);
    $("#ocr-loading").hide();
    $("#tfjs-response").html(predicted);
  });
}

function getResizedImage() {
  //create image equal to canvas size
  img = createImage(width, height);
  let imagePixels = [];
  //load pixels of the image
  img.loadPixels();
  //load pixels of the canvas
  loadPixels();
  //copy pixel values of canvas to image
  for (let y = 0; y < pixels.length; y++) {
    img.pixels[y] = pixels[y];
  }
  img.updatePixels();
  //resize image to 28x28
  img.resize(28, 28);
  img.updatePixels();
  //reload image pixels
  img.loadPixels();
  //convert image to 1D array of grayscale images
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      index = 4 * (x + y * img.width);
      let r = img.pixels[index];
      let g = img.pixels[index+1] ;
      let b = img.pixels[index + 2];
      let grayscale = (r + g + b) / 3;
      //normalize and push grayscale pixel
      normalized_pixel = grayscale / 255;
      if(normalized_pixel>0.1)
        imagePixels.push(1);
      else if(normalized_pixel<0.05)
        imagePixels.push(0);
      else
        imagePixels.push(normalized_pixel);
    }
  }
  return imagePixels;
}


$(function () { 
  $("canvas").bind("wheel mousewheel", function(e) {e.preventDefault()});
});

function setCanvasDims() {
  if (window.matchMedia('(max-width: 500px)').matches) {
    canvasWidth = 300;
    canvasHeight = 300;
    _strokeW = 20;
  } else {
    canvasWidth = 400;
    canvasHeight = 400;
    _strokeW = 20;
  }
}
