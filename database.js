
function appendRecordInHTML(record){
document.getElementById("DBDiv").innerHTML+=record.name+"  "+record.type+"  "+new Date(record.time).toLocaleString()+"<br/><br/>";
}

function putDataInIndexDB(file){
	
	var imageType = /image.*/ ;
  	var textType = /text.*/ ;

	var time = new Date().getTime();
	var name=file.name;
	var type="other"
	 if (file.type.match(imageType)) {
   			type="image";
	  }
	  else if(file.type.match(textType)) {
		type="text";
  	}
  	var record={
  	 	time:time,
  	 	name:name,
  	 	type:type
  	 };

  	var filesObjectStore = db.transaction("files", "readwrite").objectStore("files");
  	 filesObjectStore.add(record);
  	 appendRecordInHTML(record)
}

function initDB(){
TAG="INDEXDB";
log(TAG, "init");

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}


var request = window.indexedDB.open("FilesDatabase", dbVersion);

request.onerror = function(event) {
	log(TAG, "error");
  alert("Why didn't you allow my web app to use IndexedDB?!");
};

request.onsuccess = function(event) {
	log(TAG, "success");
  db = event.target.result;
  var objectStore = db.transaction("files").objectStore("files");

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
   appendRecordInHTML(cursor.value);
    cursor.continue();
  }
  
};
};

request.onupgradeneeded = function(event) { 
	log(TAG, "upgrade needed");
  db = event.target.result;

  //Create an objectStore for this database
  var objectStore = db.createObjectStore("files", { keyPath: "time" });

	objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    
  }

};


}