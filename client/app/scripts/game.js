game.game = (function() {

	function drawCanvas() {
		var canvas = document.getElementById('canvas');
		// Check the element is in the DOM and the browser supports canvas
		if (canvas.getContext) {
			// Initaliase a 2-dimensional drawing context
			var context = canvas.getContext('2d');
			//Canvas commands go here
			//context.scale(canvas.clientWidth, canvas.clientHeight);

			context.fillStyle = "#000000";
			context.rect(0, 0, canvas.width, canvas.height);
			context.fill();

			var centerX = canvas.width / 2;
			var centerY = canvas.height / 2;

			drawPlayer(context, centerX, centerY);

		}
	};

	function drawPlayer(context, x, y) {
		context.beginPath();
		context.arc(x, y, 10, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	};

	// Odsłania publiczne metody.
	return {
		drawCanvas: drawCanvas
	};
})();