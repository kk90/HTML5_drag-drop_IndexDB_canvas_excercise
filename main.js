function init() {
  var TAG = "initialization";
  log(TAG, "init");
  dropbox = document.getElementById("mycanvas");
  dropbox.addEventListener("dragleave", dragleve, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);


  canvas = document.getElementById("mycanvas");
  ctx = canvas.getContext("2d");
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
  log(TAG, "end");
}
// DRAG EVENTS
function dragleve(e) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById("canvasDiv").style.background = "transparent";
}
function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById("canvasDiv").style.background = "#339999";
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById("canvasDiv").style.background = "transparent";

  var TAG = "Drop";
  log(TAG, "dropped");
  var dt = e.dataTransfer;
  var files = dt.files;
  handlefile(files);
}