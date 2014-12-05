function handlefile(files) {
  var imageType = /image.*/ ;
  var textType = /text.*/ ;

  var TAG = "filehandler";
  log(TAG, "init");
  var file = files[0];
  log(TAG, file.type);

  if (file.type.match(imageType)) {
    log(TAG, "isImage");
    getImage(file);
  }
  else if(file.type.match(textType)) {
    log(TAG, "isText");
    getText(file);
  }
  putDataInIndexDB(file);
}


function getText(file){
var TAG = "filehandler TEXT";
var reader = new FileReader();
reader.onload = function(e) { 
	log(TAG,reader.result);
	text=reader.result;
	putTextOnCanvas();
}
reader.readAsText(file);
}



function getImage(file){
var TAG = "filehandler IMAGE";

var reader = new FileReader();

 reader.onload = function (e) 
            {
            	var img = new Image();
            	img.src = e.target.result;
            	img.onload = function  () {
            		image=img;
            		putImageOnCanvas();
            	 };

            };	
  reader.readAsDataURL(file);
	
}