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
let _strokeW = 25;
let drawing = [];
let currentPath = [];
let canDraw = false;
let ajaxRequestAccept = false;

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
  $("canvas")[0].addEventListener("touchcancel", function(event) {event.preventDefault()})
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



function predict() {
  $('#predict-button').attr("disabled", true);
  $("#server-response").html("");
  $("#ocr-loading").show();
  let image = [];
  loadPixels();
  let d = pixelDensity();
  //console.log(pixels.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = 4 * (x + y * width);
      let r = pixels[index];
      let g = pixels[index+1] ;
      let b = pixels[index + 2];
      let grayscale = rgbToGrayscale(r, g, b);
      image.push(grayscale);
      pixels[index] = grayscale;
      pixels[index+1] = grayscale;
      pixels[index+2] = grayscale;
      pixels[index+3] = 255;
    }
  }
  imgData = {
    'image': image,
    'width': width,
    'height': height
  };
  let imgDataJSON = JSON.stringify(imgData);
  ajaxRequestAccept = true;
  $.ajax({
    type: 'POST',
    url: '/apps/mlOCRAjax/',
    data: {
      "imageData": imgDataJSON  
    },
    success: function (data) {
      if (ajaxRequestAccept) {
        $("#ocr-loading").hide();
        $("#server-response").html(data);
        if (data.match(/\D/g)){
          $('#predict-button').attr("disabled", false);
        } else {
          ajaxRequestAccept = false;
        }
      }
    }
  });
}

function rgbToGrayscale(r,g,b) {
  return (r + g + b) / 3;
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
