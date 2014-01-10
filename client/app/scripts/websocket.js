var socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = function () {
	socket.send("register;test");
};

socket.onmessage = function(msg) {
	console.log(msg);
}