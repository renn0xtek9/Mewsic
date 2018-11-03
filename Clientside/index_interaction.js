function playclicked(){
	console.log("play button has been clicked");
	var command='{"command":{"type":"play"}}';
	var commandJSON=JSON.stringify(command);
	sendJsonToServer(commandJSON);	
}
function sendJsonToServer(payload){
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST','index.html',true);
	xhttp.send(payload);
}
