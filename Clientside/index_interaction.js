function playclicked(){
 	var command={"command":{"type":"play"}};
	var commandJSON=JSON.stringify(command);
	sendJsonToServer(commandJSON);	
}
function pauseclicked(){
	sendJsonToServer(JSON.stringify({"command":{"type":"pause"}}));
}
function sendJsonToServer(payload){
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST','index.html',true);
	xhttp.send(payload);
}
function getPage(page){
	console.log("get Page"+page);
	var xhttp=XMLHttpRequest
}
