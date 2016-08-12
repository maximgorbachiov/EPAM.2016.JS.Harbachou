function generateElements(count) {
	var randomNumber;
	var resultElements = [];

	for (var i = 0; i < count; i++) {
		randomNumber = getRandomNumber(1, 100);
		resultElements[i] = { number: randomNumber };	
	}

	return resultElements;
}

function setColorToElements(elements) {
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].number > 75) {
			elements["color"] = "#f44336";
		} else if (elements[i].number > 50) {
			elements["color"] = "#ff9800";
		} else if (elements[i].number > 25) {
			elements["color"] = "#4caf50";
		}
	}
}

function resetElements() {
	return [];
}
