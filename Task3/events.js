var elements = [];

function generateEvent() {
	elements = generateElements(75);

	for (var i = 0; i < elements.length; i++) {
		$("container-field").append("<div class=\"blockElement\"></div>");
	}
}

function setColorEvent() {
	setColorToElements(elements);
}

function resetEvent() {
	elements = resetElements();
}


$(document).ready(function(){
	    $("#generateButton").click(generateEvent);
		$("#setColorButton").click(setColorEvent);
		$("#resetButton").click(resetEvent);
    });