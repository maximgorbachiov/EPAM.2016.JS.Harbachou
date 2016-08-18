$(document).ready(function() {
	// startButton and field used in many functions
	var $startButton;
	var $field;

	// timeOut timers id for clear them in stop method
	var fruitTimeOutId;
	var bombTimeOutId;

	// times for fadeOut and create next resource
	var fruitFadeOutTime = 1500;
	var fruitCreationTime = 1000;
	var bombFadeOutTime = 2000;
	var bombCreationTime = 5000;

	// resources names and count of each resource
	var resources = [ 
		{ name: "cheese", count: 0 }, 
		{ name: "orange", count: 0 }, 
		{ name: "cherry", count: 0 }, 
		{ name: "pumpkin", count: 0 }
	];

	var bombName = "bomb";

	function startGame() {
		$(".resource").each(function() {
			var $this = $(this);
			$this.toggleClass("click-taboo");
			continueAnimation($this);
		});	

		changeStartButton(startGame, stopGame, "red", "Stop");
		
		fruitTimeOutId = setTimeout(recursiveCreateFruit, fruitCreationTime);
		bombTimeOutId = setTimeout(recursiveCreateBomb, bombCreationTime);
	}

	function stopGame() {
		clearTimeout(fruitTimeOutId);
		clearTimeout(bombTimeOutId);

		changeStartButton(stopGame, startGame, "green", "Start");

		$(".resource").each(function() {
			var $this = $(this);
			$this.stop(true);
			$this.toggleClass("click-taboo");
		});
	}

	function changeStartButton(oldHandler, newHandler, color, value) {
		$startButton.unbind("click", oldHandler);
		$startButton.bind("click", newHandler);
		$startButton.css("background-color", color);
		$startButton.val(value);
	}

	function recursiveCreateFruit() {
		createResource(getFruit, fruitFadeOutTime);
	    fruitTimeOutId = setTimeout(recursiveCreateFruit, fruitCreationTime);
	}

	function recursiveCreateBomb() {
		createResource(getBomb, bombFadeOutTime);
	    bombTimeOutId = setTimeout(recursiveCreateBomb, bombCreationTime);
	}

	function createResource(getResourcePath, animationTime) {
		var $newResource = $("<div class=\"resource " + getResourcePath() + "\"></div>");
		$field.append($newResource);

		var coordinate = getCoordinates($newResource);
		
		$newResource.css("top", coordinate.Y);
		$newResource.css("left", coordinate.X);

		displayResource($newResource, animationTime);
	}

	function displayResource($resource, fadeOutTime) {
		$resource.fadeOut(fadeOutTime, function() {
			$resource.remove();
		});
	}

	function continueAnimation($resource) {
		var resourceName = getResourceName($resource);
		var timeToFadeOut = (resourceName == bombName) ? bombFadeOutTime : fruitFadeOutTime;

		displayResource($resource, timeToFadeOut);
	}

	function fruitClick() {
		var $this = $(this);
		var fruitName = getResourceName($this);
		var $fruitCounter = $("#" + fruitName);

		$fruitCounter.text(increaseResourceCount(fruitName));
		$this.remove();

		function increaseResourceCount(resourceName) {
			for (var i = 0; i < resources.length; i++) {
				if (resources[i].name == resourceName) {
					return resources[i].count += 1;
				}
			}
		}
	}

	function bombClick() {
		var $this = $(this);
		var bombedPoints = 10;
		var fruit = decreaseResourceCount(bombedPoints);
		var $fruitCounter = $("#" + fruit.name);
		var count = (fruit.count != 0) ? fruit.count : "-";

		$fruitCounter.text(count);
		$this.remove();

		function decreaseResourceCount(bombedPoints) {
			var number = getRandomNumber(0, resources.length);
			
			resources[number].count = (resources[number].count > (bombedPoints - 1)) 
				? resources[number].count - bombedPoints
				: 0;

			return resources[number];
		}
	}

	function getCoordinates($resource) {
		var boundDelimeter = 20;
		var width = $field.width();
		var height = $field.height();

		var offset = calcSidesParams(width, height, boundDelimeter);

		var x = getRandomNumber(offset.width, width - offset.width - $resource.width());
		var y = getRandomNumber(offset.height, height - offset.height - $resource.height());

		return { X: x, Y: y };
	}

	$field = $(".field");
	$startButton = $(".start-button");
	
	$startButton.bind("click", startGame);

	$field.on("click", ".resource", fruitClick);
	$field.on("click", ".bomb", bombClick);
 });