var http = require('http');
var url = require ('url');
var fs = require('fs');
var collection_manager = require("./music_collection_management.js");
var child_process = require('child_process');
// var hostname = '127.0.0.1';
var hostname = '127.0.0.1';
var port = 3000;

var subprocess = child_process.spawn('/usr/bin/vlc',['-I','rc'], {stdio: [
	'pipe', // Use parent's stdin for child
	'pipe', // Pipe child's stdout to parent
	fs.openSync('err.out', 'w') // Direct child's stderr to a file
	]
});
subprocess.stdin.setEncoding('utf-8');




var server = http.createServer(function (req, res) {
	var reqparsed=url.parse(req.url,true);
	
	var filename="./../Clientside"+reqparsed.pathname;
	if (req.method=='POST')
	{
		console.log("New Post request");
		//TODO check if that is a json or not !
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			AnalyzePostRequest(body);
		});
	}
	
	fs.readFile(filename,function(err,data){
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}  
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function AnalyzePostRequest(body) {
	console.log(JSON.parse(body));
 	var myobj=JSON.parse(body);
	
// 	console.log(myobj['command']);
	
// 	console.log(Object.keys(myobj));
	if ('command' in myobj)
	{
		if('type' in myobj['command'])
		{
			var cmd=myobj['command']['type'];
			switch (cmd) {
				case 'play':
					Play();
					break;
				case 'pause':
					Pause();
					break;
				case 'rescancollection':
					console.log("Rescanning the whole colleciton from "+myobj['command']['path']);
					RescanWholeCollection(myobj['command']['path']);
					break;
				default:
					console.log('Command not yet implemented');
			}
		}
		else {
			console.log("Type of command not known");
		}
	}
	else{
		console.log("Request not understood");
	}
}
function RescanWholeCollection(path){
	try{
		collection_manager.ScanCollection(path);
	}
	catch (e){
		console.log('Error scanning collection: '+e);
	}	
}

function Play() {
	try{
		subprocess.stdin.write("add /home/max/Music/Ed_Sheeran/Ed_Sheeran_-_Perfect_Duet_(with_Beyonce)_lyrics.mp3\n");		
		subprocess.stdin.write("play \n");		
	}
	catch(e){
		console.log(e);
	}
}
function Pause() {
	try{
		subprocess.stdin.write("pause\n");
	}
	catch(e){
		console.log(e);
	}
}
