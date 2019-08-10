const http = require('http');
const url = require('url');
const fs = require('fs');
const childProcess = require('child_process');
const collectionManager = require('./music_collection_management.js');
// var hostname = '127.0.0.1';
const hostname = '127.0.0.1';
const port = 3000;

const subprocess = childProcess.spawn('/usr/bin/vlc', ['-I', 'rc'], {
  stdio: [
    'pipe', // Use parent's stdin for child
    'pipe', // Pipe child's stdout to parent
    fs.openSync('err.out', 'w'), // Direct child's stderr to a file
  ],
});
subprocess.stdin.setEncoding('utf-8');


function RescanWholeCollection(path) {
  try {
    collectionManager.ScanCollection(path);
  } catch (e) {
    console.log(`Error scanning collection: ${e}`);
  }
}
function Play() {
  try {
    subprocess.stdin.write('add /home/max/Music/Ed_Sheeran/Ed_Sheeran_-_Perfect_Duet_(with_Beyonce)_lyrics.mp3\n');
    subprocess.stdin.write('play \n');
  } catch (e) {
    console.log(e);
  }
}
function Pause() {
  try {
    subprocess.stdin.write('pause\n');
  } catch (e) {
    console.log(e);
  }
}

function AnalyzePostRequest(body) {
  console.log(JSON.parse(body));
  const myobj = JSON.parse(body);

  //   console.log(myobj['command']);

  //   console.log(Object.keys(myobj));
  if ('command' in myobj) {
    if ('type' in myobj.command) {
      const cmd = myobj.command.type;
      switch (cmd) {
        case 'play':
          Play();
          break;
        case 'pause':
          Pause();
          break;
        case 'rescancollection':
          console.log(`Rescanning the whole colleciton from ${myobj.command.path}`);
          RescanWholeCollection(myobj.command.path);
          break;
        default:
          console.log('Command not yet implemented');
      }
    } else {
      console.log('Type of command not known');
    }
  } else {
    console.log('Request not understood');
  }
}
const server = http.createServer((req, res) => {
  const reqparsed = url.parse(req.url, true);
  const filename = './../Clientside'.concat(reqparsed.pathname);
  console.log(filename);
  if (req.method == 'POST') {
    console.log('New Post request');
    // TODO check if that is a json or not !
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      AnalyzePostRequest(body);
    });
  }
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
    if (/\.(html)$/.test(filename)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
    }
    if (/\.(css)$/.test(filename)) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    if (/\.(js)$/.test(filename)) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
    }
    res.write(data);
    res.end();
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
