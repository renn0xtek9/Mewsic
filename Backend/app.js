var http = require('http');
var url = require ('url');
var fs = require('fs');
var hostname = '127.0.0.1';
var port = 3000;

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

function AnalyzePostRequest(body)
{
	console.log(body);	
}
