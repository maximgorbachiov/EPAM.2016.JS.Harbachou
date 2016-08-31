function Strong($line) {
	var zombieCssType = "strong";
	var baseSpeed = 1;
	var realSpeed = baseSpeed;

	var protected = Zombie.call(this, $line);
	
	var baseMove = this.move;
	var baseDamage = this.damageZombie;

	this._baseHp = 80;
	this._realHp = this._baseHp;

	protected._$gif.addClass(zombieCssType);
	protected._$zombie.css("width", protected._$gif.width());

	this.move = function() {
		return baseMove.call(this, realSpeed);
	}

	this.damageZombie = function(damageHpCount) {
		return baseDamage.call(this, damageHpCount);
	}

	this.speedToBase = function() {
		realSpeed = protected._baseSpeed;
	}

	this.speedToReal = function() {
		realSpeed = baseSpeed;
	}
}