function getFruit() {
	var number = getRandomNumber(0, 4);

	switch (number) {
		case 0: return "cheese";
		case 1: return "orange";
		case 2: return "cherry";
		case 3: return "pumpkin";
	}
}

function getBomb() {
	return "bomb";
}

function getResourceName($resource) {
	var source = $resource.css("background-image");
	var pathes = source.split('/');
	var filenameAndExtension = pathes[pathes.length - 1].split('.');
	return filenameAndExtension[0];
}

function calcSidesParams(sideWidth, sideHeight, delimeter) {
	return { 
		width: sideWidth / delimeter, 
		height: sideHeight / delimeter 
	};
}