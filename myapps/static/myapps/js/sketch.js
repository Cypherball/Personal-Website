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
let drawing = [];
let currentPath = [];
let canDraw = false;

function setup() {
  setCanvasDims();
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-holder');
  pixelDensity(1);
  canvas.mousePressed(startPath);
  canvas.touchStarted(startPath);
  canvas.mouseReleased(endPath);
  canvas.touchEnded(endPath);
  var clearBtn = select("#clear-button");
  var detectBtn = select("#detect-button");
  clearBtn.mousePressed(clearCanvas);
  detectBtn.mousePressed(predict);
  background(0, 0, 0);
  $("canvas").bind("wheel mousewheel", function (e) { e.preventDefault() });
  $("canvas")[0].addEventListener("touchstart",  function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchmove",   function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchend",    function(event) {event.preventDefault()})
  $("canvas")[0].addEventListener("touchcancel", function(event) {event.preventDefault()})
}

function startPath() {
  canDraw = true;
  currentPath = [];
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
    strokeWeight(30);
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

function clearCanvas() {
  drawing.length = 0;
  currentPath.length = 0;
  clear();
  setup();
  $("#server-response").removeClass("fas fa-spinner");
  $("#server-response").html("");
}



function predict() {
  $("#server-response").addClass("fa fa-spinner fa-pulse fa-fw");
  //gsap.to("#server-response", {duration: 1.5, rotationZ: 360, repeat:-1, ease:Power1.easeInOut});
  let image = [];
  loadPixels();
  let d = pixelDensity();
  //console.log(pixels.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = 4 * (x + y * width);
      /*if (pixels[index] == 255 && pixels[index + 1] == 255 && pixels[index + 2] == 255 && pixels[index + 3] == 255) {
        continue;
      }*/
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
  updatePixels();
  imgData = {
    'image': image,
    'width': width,
    'height': height
  };
  var imgDataJSON = JSON.stringify(imgData);
  $.ajax({
    type: 'POST',
    url: '/apps/mlOCRAjax/',
    data: {
      "imageData": imgDataJSON  
    },
    success: function (data) {
      $("#server-response").removeClass("fa fa-spinner fa-pulse fa-fw");
      $("#server-response").html(data[0]);
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
  } else {
    canvasWidth = 400;
    canvasHeight = 400;
  }
}
