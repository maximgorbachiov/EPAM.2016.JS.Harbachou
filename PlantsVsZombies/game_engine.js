$(document).ready(function() {
	var isGame = true;
	var zombies = [];
	var isSpeedChange = false;
	var damageIterationsCount = 10;
	var damageTimeoutId;
	var speedTimeoutId;
	var generateTimeoutId;
	var zombieGenerateTime = 1000;

	function startGameClick() {
		isGame = true;
		
		gameOverDisappear();

		setButtonDisabledState("#btnStartGame");
		
		setButtonEnabledState("#btnEndGame");
		setButtonEnabledState("#btnDamage");
		setButtonEnabledState("#btnSpeed");
		setButtonEnabledState("#btnDecreaseHp");

		generate();
	}

	function generate() {
		var zombieStepTime = 50;
		var zombie = getRandomZombie();
		zombies.push(zombie);

		if (isSpeedChange) {
			zombie.speedToBase();
		}

		makeStep(zombie);

		function makeStep(zombie) {
			if (isGame) {
				if (zombie.move()) {
					setTimeout(makeStep, zombieStepTime, zombie);
				} else if (zombie.getHp() <= 0) {
					deleteZombie(zombie);
				} else {
					endGame();
				}
			} else {
				zombie.kill();
				deleteZombie(zombie);
			}
		}

		function deleteZombie(zombie) {
			for (var i = 0; i < zombies.length; i++) {
				if (zombies[i] == zombie) {
					zombies.splice(i, 1);
					break;
				}
			}
		}

		function endGame() {
			isGame = false;

			$(".game-over").css("display", "block");
			$(".zombie").remove();

			setButtonDisabledState("#btnDamage");
			setButtonDisabledState("#btnSpeed");
			setButtonDisabledState("#btnDecreaseHp");

			stopSpeedChange();
			stopDamageInTime();
			stopGenerate();
		}

		function getRandomZombie() {
			var i = getRandomNumber(0, 2);

			if (i == 0) {
				return new Strong(getRandomLine());
			} else {
				return new Michael(getRandomLine());
			}

			function getRandomLine() {
				var j = getRandomNumber(0, 5);

				return $(".field-line").eq(j);
			}
		}

		generateTimeoutId = setTimeout(generate, zombieGenerateTime);
	}

	function endGameClick() {
		isGame = false;
		stopSpeedChange();
		stopDamageInTime();
		stopGenerate();

		setButtonEnabledState("#btnStartGame");
		
		setButtonDisabledState("#btnEndGame");
		setButtonDisabledState("#btnDamage");
		setButtonDisabledState("#btnSpeed");
		setButtonDisabledState("#btnDecreaseHp");

		gameOverDisappear();
	}

	function damageClick() {
		var damageDisableTime = 2000;
		var damagedHp = 15;

		makeDamageToAllZombies(damagedHp);

		setButtonDisabledState("#btnDamage");
		setTimeout(enabledDamageButton, damageDisableTime);
	}

	function enabledDamageButton() {
		setButtonEnabledState("#btnDamage");
	}

	function damageInTimeClick() {
		var damageIterationTime = 1000;

		setButtonDisabledState("#btnDecreaseHp");

		damageInTime();

		function damageInTime() {
			var damagedHp = 1;

			makeDamageToAllZombies(damagedHp);

			if (--damageIterationsCount > 0) {
				damageTimeoutId = setTimeout(damageInTime, damageIterationTime);
			} else {
				stopDamageInTime();
			}
		}
	}

	function makeDamageToAllZombies(damagedHp) {
		for (var i = 0; i < zombies.length; i++) {
			if (!(zombies[i].damageZombie(damagedHp))) {
				zombies.splice(i, 1);
				i--;
			}
		}
	}

	function speedClick() {
		var speedChangeTime = 10000;

		setButtonDisabledState("#btnSpeed");

		for (var i = 0; i < zombies.length; i++) {
			zombies[i].speedToBase();
		}

		isSpeedChange = true;

		speedTimeoutId = setTimeout(returnRealSpeed, speedChangeTime);
	}

	function returnRealSpeed() {
		for (var i = 0; i < zombies.length; i++) {
			zombies[i].speedToReal();
		}

		setButtonEnabledState("#btnSpeed");
		isSpeedChange = false;
	}

	function stopDamageInTime() {
		clearTimeout(damageTimeoutId);
		damageIterationsCount = 10;

		if (isGame) {
			setButtonEnabledState("#btnDecreaseHp");
		}
	}

	function stopSpeedChange() {
		clearTimeout(speedTimeoutId);

		if (isGame) {
			setButtonEnabledState("#btnSpeed");
		}
	}

	function stopGenerate() {
		clearTimeout(generateTimeoutId);
	}

	function setButtonEnabledState(buttonId) {
		var $button = $(buttonId);

		if (($button.hasClass("disabled-state"))) {
			$button.removeClass("disabled-state");
		}
	}

	function setButtonDisabledState(buttonId) {
		var $button = $(buttonId);

		if (!($button.hasClass("disabled-state"))) {
			$button.addClass("disabled-state");
		}
	}

	function gameOverDisappear() {
		$(".game-over").css("display", "none");
	}

	$("#btnEndGame").bind("click", endGameClick);
	$("#btnStartGame").bind("click", startGameClick);
	$("#btnDamage").bind("click", damageClick);
	$("#btnSpeed").bind("click", speedClick);
	$("#btnDecreaseHp").bind("click", damageInTimeClick);

	setButtonDisabledState("#btnEndGame");
	setButtonDisabledState("#btnDamage");
	setButtonDisabledState("#btnSpeed");
	setButtonDisabledState("#btnDecreaseHp");
});