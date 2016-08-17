$(document).ready(function() {
	
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

		changeButtonState("#generateButton", null);
		changeButtonState("#setColorButton", setColorEvent);
		changeButtonState("#resetButton", resetEvent);
	}

	function setColorEvent() {
		setColorToElements(elements);
		var i = 0;

		$(".container-field .blockElement").addClass(function() {
			traceInfo("element" + i + " is colored");
			return elements[i++].backgroundColor;
		});

		changeButtonState("#setColorButton", null);
	}

	function resetEvent() {
		elements = resetElements();

		$(".container-field .blockElement").remove();
		changeButtonState("#generateButton", generateEvent);
		changeButtonState("#resetButton", null);
	}

	function changeButtonState(buttonId, handler) {
		$button = $(buttonId);

		if (handler == null) {
			$button.unbind("click");
		} else {
			$button.bind("click", handler);
		}

		$button.toggleClass("disable-button");
	}

	$("#generateButton").bind("click", generateEvent);

	changeButtonState("#setColorButton", null);
	changeButtonState("#resetButton", null);
});