function playclicked(){
 	var command={"command":{"type":"play"}};
// 	var commandJSON=JSON.stringify(command);
// 	sendJsonToServer(commandJSON);	
	sendJsonToServer(command);
}
function pauseclicked(){
// 	sendJsonToServer(JSON.stringify({"command":{"type":"pause"}})); //OLD code 
	
	var payload={command:{
		type:"pause"}};
	sendJsonToServer(payload)
	
}
function sendJsonToServer(payload){		//TODO make it async !!
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST','index.html',true);
	xhttp.send(JSON.stringify(payload));
}
function getPage(page){
	console.log("get Page"+page);
// 	var xhttp=XMLHttpRequest;
}
function reScanCollection(){
	console.log("clicked");
	var path=document.getElementsByName("musicpathinput")[0].value;
	if (path!="")
	{
		cmd={command:{
			type:"rescancollection",
			path:path}};
		sendJsonToServer(cmd);
	}	
}
