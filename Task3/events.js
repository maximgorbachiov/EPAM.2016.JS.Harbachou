var elements = [];

function generateEvent() {
	if (elements.length == 0) {
		elements = generateElements(75);
		traceInfo("elements created");

		for (var i = 0; i < elements.length; i++) {
			$(".container-field").append("<div class=\"blockElement\">" + elements[i].number + "</div>");
			traceInfo("element" + i + " was add");
		}
	}

	activateButtons(true, false, false);
}

function setColorEvent() {
	setColorToElements(elements);
	var i = 0;

	$(".container-field .blockElement").css("background-color", function() {
		traceInfo("element" + i + " is colored");
		return elements[i++].color;
	});

	$("#setColorButton").attr("disabled", true);
}

function resetEvent() {
	elements = resetElements();

	$(".container-field .blockElement").remove();
	activateButtons(false, true, true);
}

function activateButtons(generateDisable, setColorDisable, resetDisable) {
	$("#generateButton").attr("disabled", generateDisable);
	$("#setColorButton").attr("disabled", setColorDisable);
	$("#resetButton").attr("disabled", resetDisable);
}

$(document).ready(function() {
	    $("#generateButton").bind("click", generateEvent);
		$("#setColorButton").bind("click", setColorEvent);
		$("#resetButton").bind("click", resetEvent);

		activateButtons(false, true, true);
    });