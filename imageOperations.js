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
		putTextOnCanvas();	
	}
	
}