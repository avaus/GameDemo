game.player = (function() {

	function Player(x, y) {

		this.x = x;
		this.y = y;

		this.destX = x;
		this.destY = y;

		this.speed = 200;

		this.width = 50;
		this.height = 50;
	}

	var calculateWayLength = function(destX, destY) {
		return Math.sqrt(Math.pow((this.x - destX),2) + Math.pow((this.y - destY),2));
	}

	Player.prototype.move = function(step, worldWidth, worldHeight) {
		// parameter step is the time between frames ( in seconds )

		// check controls and move the player accordingly
		if (game.controls.left)
			this.x -= this.speed * step;
		if (game.controls.up)
			this.y -= this.speed * step;
		if (game.controls.right)
			this.x += this.speed * step;
		if (game.controls.down)
			this.y += this.speed * step;

		// don't let player leaves the world's boundary
		if (this.x - this.width / 2 < 0) {
			this.x = this.width / 2;
		}
		if (this.y - this.height / 2 < 0) {
			this.y = this.height / 2;
		}
		if (this.x + this.width / 2 > worldWidth) {
			this.x = worldWidth - this.width / 2;
		}
		if (this.y + this.height / 2 > worldHeight) {
			this.y = worldHeight - this.height / 2;
		}
	}

	Player.prototype.draw = function(context, xView, yView) {
		// draw a simple rectangle shape as our player model
		context.save();
		context.fillStyle = "black";
		// before draw we need to convert player world's position to canvas position			
		//context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);

		var centerX = (this.x) - xView;
		var centerY = (this.y) - yView;
		var radius = this.width / 2 - 2;

		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = '#8C72F2';
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = '#eeeeee';
		context.stroke();

		context.restore();
	}

	// Odsłania publiczne metody.
	return {
		Player: Player
	};
})();