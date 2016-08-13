function generateElements(count) {
	var randomNumber;
	var resultElements = [];

	traceInfo("elements start create");

	for (var i = 0; i < count; i++) {
		randomNumber = getRandomNumber(1, 100);
		resultElements[i] = { number: randomNumber };	
		traceInfo("element" + i + " with number " + randomNumber + " was create");
	}

	return resultElements;
}

function setColorToElements(elements) {
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].number > 75) {
			elements[i]["color"] = "#f44336";
		} else if (elements[i].number > 50) {
			elements[i]["color"] = "#ff9800";
		} else if (elements[i].number > 25) {
			elements[i]["color"] = "#4caf50";
		} else {
			elements[i]["color"] = "#FFFFFF";
		}
	}
}

function resetElements() {
	return [];
}
