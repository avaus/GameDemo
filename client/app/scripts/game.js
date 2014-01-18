game.game = (function() {

	// prepaire our game canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	// game settings:
	var FPS = 60;
	var INTERVAL = 1000 / FPS; // milliseconds
	var STEP = INTERVAL / 1000 // seconds

	// setup an object that represents the room
	var room = {
		width: 5000,
		height: 3000,
		map: new game.map.Map(5000, 3000)
	};

	// generate a large image texture for the room
	room.map.generate();

	// setup player
	var player = new game.player.Player(50, 50);

	// setup the magic camera !!!
	var camera = new game.camera.Camera(0, 0, canvas.width, canvas.height, room.width, room.height);
	camera.follow(player, canvas.width / 2, canvas.height / 2);

	canvas.addEventListener("click", function(event) {
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left + camera.xView;
		var y = event.clientY - rect.top + camera.yView;
		if (typeof socket != 'undefined') {
			socket.send("goto;" + x + ";" + y);
		}
		player.setDestination(STEP, x, y);
	}, false);

	// Game update function
	var update = function() {
		player.move(room.width, room.height);
		camera.update();
	}

	// Game draw function
	var draw = function() {
		// clear the entire canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// redraw all objects
		room.map.draw(context, camera.xView, camera.yView);
		player.draw(context, camera.xView, camera.yView);
	}

	// Game Loop
	var gameLoop = function() {
		update();
		draw();
	}

	// <-- configure play/pause capabilities:

	// I'll use setInterval instead of requestAnimationFrame for compatibility reason,
	// but it's easy to change that.

	var runningId = -1;

	function play() {
		if (runningId == -1) {
			runningId = setInterval(function() {
				gameLoop();
			}, INTERVAL);
			console.log("play");
		}
	}

	function togglePause() {
		if (runningId == -1) {
			play();
		} else {
			clearInterval(runningId);
			runningId = -1;
			console.log("paused");
		}
	}

	// Odsłania publiczne metody.
	return {
		play: play,
		togglePause: togglePause
	};
})();