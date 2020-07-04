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
let _strokeW = 55;
let drawing = [];
let currentPath = [];
let canDraw = false;
let ajaxRequestAccept = false;
//const model = loadmodel();
let model;

async function setup() {
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
  model = await tf.loadLayersModel(modelURL);
}

function startPath() {
  canDraw = true;
  $('#predict-button').attr("disabled", false);
  currentPath.splice(0, currentPath.length);
  drawing.push(currentPath);
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
}


function resetCanvas() {
  setCanvasDims();
  resizeCanvas(canvasWidth, canvasHeight);
  drawing.splice(0, drawing.length);
  currentPath.splice(0, currentPath.length);
  clear();
  ajaxRequestAccept = false;
  $('#predict-button').attr("disabled", true);
  background(0, 0, 0);
  $("#ocr-loading").hide();
  $("#server-response").html("");
}



async function predict() {
  $('#predict-button').attr("disabled", true);
  $("#server-response").html("");
  $("#ocr-loading").show();
 
  let imagePixels = getResizedImage();

  tfImage = tf.tensor(imagePixels,[1,28,28,1],'float32');
  const prediction = await model.predict([tfImage]).array().then(function (scores) {
    scores = scores[0];
    predicted = scores.indexOf(Math.max(...scores));
    console.log(predicted);
    $("#ocr-loading").hide();
    $("#server-response").html(predicted);
    $('#predict-button').attr("disabled", false);
  });
}

function getResizedImage() {
  //create image equal to canvas size
  let img = createImage(width, height);
  let imagePixels = [];
  //load pixels of the image
  img.loadPixels();
  //load pixels of the canvas
  loadPixels();
  //copy pixel values of canvas to image
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      index = 4 * (x + y * width);
      img.pixels[index] = pixels[index];
      img.pixels[index+1] = pixels[index+1];
      img.pixels[index + 2] = pixels[index+2];
      img.pixels[index + 3] = pixels[index+3];
    }
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
      imagePixels.push(grayscale/255);
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
    _strokeW = 15;
  } else {
    canvasWidth = 400;
    canvasHeight = 400;
    _strokeW = 25;
  }
}
