function log(data) {
	for (var i = 0; i < data.length; i++) {
		if (data[i] === undefined) {
			console.log("undefined");
		} else if (data[i] === null) {
			console.log("null");
		} else {
			console.log("data[%d]=%s", i, data[i]);
		}
	}
}