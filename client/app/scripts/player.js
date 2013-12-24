game.player = (function() {

	function Player(x, y) {

		this.x = x;
		this.y = y;

		this.destX = x;
		this.destY = y;

		this.xMove = 0;
		this.yMove = 0;

		this.speed = 200;

		this.width = 50;
		this.height = 50;
	}

	Player.prototype.calculateWayLength = function() {
		return Math.sqrt(Math.pow((this.x - this.destX), 2) + Math.pow((this.y - this.destY), 2));
	}

	Player.prototype.setDestination = function(step, destX, destY) {
		this.destX = parseInt(destX);
		this.destY = parseInt(destY);

		var wayLength = this.calculateWayLength();
		var moveSpeed = this.speed * step;
		var turns = wayLength / moveSpeed;

		this.xMove = (destX - this.x) / turns;
		this.yMove = (destY - this.y) / turns;
	}

	Player.prototype.move = function(worldWidth, worldHeight) {

		if (this.x < this.destX + 2 && this.x > this.destX - 2) {

			this.xMove = 0;
		} else {
			this.x += this.xMove;
		}
		if (this.y < this.destY + 2 && this.y > this.destY - 2) {
			this.yMove = 0;
		} else {
			this.y += this.yMove;
		}

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