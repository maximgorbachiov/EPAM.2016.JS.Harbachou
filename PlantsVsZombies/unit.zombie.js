function Zombie($line) {
	this._baseHp = 50;
	this._realHp = this._baseHp;

	var baseSpeed = 1;
	var $line = $line;
	var $zombie = $("<div class=\"zombie\"></div>");
	var $lifeProgressbar = $("<div class=\"health-progressbar\"></div>");
	var $health = $("<div class=\"health\"></div>");
	var $gif = $("<div></div>");

	$lifeProgressbar.append($health);
	$zombie.append($lifeProgressbar);
	$zombie.append($gif);
	$line.append($zombie);

	this.move = function(speed) {
		if (($zombie == undefined) || ($zombie == null)) {
			return false;
		}

		var left = $zombie.position().left;

		if (left != 0) {
			left -= speed;
			$zombie.css("left", left);
			
			return true;
		}

		return false;
	};

	this.damageZombie = function(damegeLifeCount) {
		this._realHp -= damegeLifeCount;

		if (this._realHp > 0) {
			updateLifeProgressbar.call(this);
			return true;
		} else {
			this.kill();
			return false;
		}
	}

	this.getHp = function() {
		return this._realHp;
	}

	this.getXCoordinate = function() {
		return $zombie.position().left;
	}

	this.kill = function() {
		$zombie.remove();
	}

	function updateLifeProgressbar() {
		var percent = this._realHp / this._baseHp;
		var progressbarWidth = $lifeProgressbar.width();
		var newWidth = progressbarWidth * percent;
		$health.css("width", newWidth);
	}

	return {
		_$zombie: $zombie,
		_$gif: $gif,
		_baseSpeed: baseSpeed,
	};
} 