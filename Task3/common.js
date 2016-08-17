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
			elements[i]["backgroundColor"] = "background-color-orange";
		} else if (elements[i].number > 50) {
			elements[i]["backgroundColor"] = "background-color-red";
		} else if (elements[i].number > 25) {
			elements[i]["backgroundColor"] = "background-color-green";
		} else {
			elements[i]["backgroundColor"] = "background-color-white";
		}
	}
}

function resetElements() {
	return [];
}
