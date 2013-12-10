var socket = new WebSocket("ws://server:1234");

socket.onopen = function () {
	socket.send("Message");
};

socket.onmessage = function(msg) {
	alert(msg);
	console.log(msg);
}