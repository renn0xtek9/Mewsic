// TODO make it async !!
function sendJsonToServer(payload) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'index.html', true);
  xhttp.send(JSON.stringify(payload));
}
function playclicked() {
  const command = { command: { type: 'play' } };
  // var commandJSON=JSON.stringify(command);
  // sendJsonToServer(commandJSON);
  sendJsonToServer(command);
}
function pauseclicked() {
  // sendJsonToServer(JSON.stringify({"command":{"type":"pause"}})); //OLD code
  const payload = { command: { type: 'pause' } };
  sendJsonToServer(payload);
}
function getPage(page) {
  console.log('get Page'.concat(page));
  // var xhttp=XMLHttpRequest;
}
function reScanCollection() {
  console.log('clicked');
  const path = document.getElementsByName('musicpathinput')[0].value;
  if (path !== '') {
    const command = { command: { type: 'rescancollection', path } };
    sendJsonToServer(command);
  }
}
