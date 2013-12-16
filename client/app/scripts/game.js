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

	var x, y = 50;

	window.addEventListener("mousemove", function(e) {
		x = event.clientX;
		y = event.clientY;
	}, false);

	window.addEventListener("mousedown", function(e) {
		if (x > player.x) {
			game.controls.right = true;
		}
		if (x < player.x) {
			game.controls.left = true;
		}
		if (y > player.y) {
			game.controls.down = true;
		}
		if (y < player.y) {
			game.controls.up = true;
		}

	}, false);


	window.addEventListener("mouseup", function(e) {
		game.controls.left = false;
		game.controls.up = false;
		game.controls.right = false;
		game.controls.down = false;
	}, false);

	// Game update function
	var update = function() {
		player.move(STEP, room.width, room.height);
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

game.controls = {
	left: false,
	up: false,
	right: false,
	down: false,
};

window.addEventListener("keydown", function(e) {
	switch (e.keyCode) {
		case 37: // left arrow
			game.controls.left = true;
			break;
		case 38: // up arrow
			game.controls.up = true;
			break;
		case 39: // right arrow
			game.controls.right = true;
			break;
		case 40: // down arrow
			game.controls.down = true;
			break;
	}
}, false);

window.addEventListener("keyup", function(e) {
	switch (e.keyCode) {
		case 37: // left arrow
			game.controls.left = false;
			break;
		case 38: // up arrow
			game.controls.up = false;
			break;
		case 39: // right arrow
			game.controls.right = false;
			break;
		case 40: // down arrow
			game.controls.down = false;
			break;
		case 80: // key P pauses the game
			game.game.togglePause();
			break;
	}
}, false);