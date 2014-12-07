function mClear(){
	ctx.rect(0, 0, canvas.width, canvas.height);
  	ctx.fillStyle = "black";
  	ctx.fill();
}

function Refresh(){
	mClear();
  	
  	putImageOnCanvas();
  	putTextOnCanvas();

}

function putTextOnCanvas(){

	if(ctx!=null&&text!=null){
		ctx.fillStyle="red";
		ctx.font = "bold 16px Arial";
		var parts=text.split("\n");
		for(var i=0; i< parts.length; i++){
			ctx.fillText(parts[i], 30, 20*i);
		}

		
	}
}

function putImageOnCanvas(){
	if(ctx!=null&&image!=null){
		var scale=canvas.width/image.width;
		var topmargin=Math.max((canvas.height-image.height*scale)/2,0);
		ctx.drawImage(image,0,topmargin,canvas.width,image.height*scale);
	}
	
}
var imageData=null;

function putConvertedImage(){
	ctx.putImageData(imageData, 0, 0);
	putTextOnCanvas();
}


function getImageData(){
	mClear();
	putImageOnCanvas();
	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	Refresh();
}


function applyFilter1(){
	var TAG="filtering";
	log(TAG,"filter1");
	var pixels = imageData.data;
	for (var i = 0; i < pixels.length; i += 4) {
        pixels[i]   = 255 - pixels[i];   // red
        pixels[i+1] = 255 - pixels[i+1]; // green
        pixels[i+2] = 255 - pixels[i+2]; // blue
        // i+3 is alpha (the fourth element)
    }
  
    // overwrite original image
   
}

function applyFilter2(){
	var TAG="filtering";
	log(TAG,"filter2");
	var pixels = imageData.data;
	n=20;
	for (var i = 0; i < pixels.length; i += 4) {
        // pixels[i]   =Math.min(255, pixels[i]+n);   // red
        // pixels[i+1] = Math.min(255,pixels[i+1]+n); // green
        // pixels[i+2] = Math.min(255, pixels[i+2]+n); // blue
        pixels[i]   = 255 - pixels[i+1];   // red
        pixels[i+1] = 255 - pixels[i+2]; // green
        pixels[i+2] = 255 - pixels[i]; // blue
        // i+3 is alpha (the fourth element)
    }
	Refresh();
}

function filter1Clicked(){
	var TAG="filtering";
	log(TAG,"1");
	getImageData();
	document.getElementById("check1").checked=true;
		applyFilter1();
	if(document.getElementById("check2").checked){
		applyFilter2();
	}
	putConvertedImage();
}

function filter2Clicked(){
	var TAG="filtering";
	log(TAG,"2");
	getImageData();
	document.getElementById("check2").checked=true;
		applyFilter2();
	if(document.getElementById("check1").checked){
		applyFilter1();
	}
	putConvertedImage();
}