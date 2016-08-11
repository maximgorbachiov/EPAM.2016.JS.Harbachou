function traceInit(type, count) {
	console.log("type=%d, count=%d", type, count);
}

function traceResult(data) {
	var countsArray = createEmptyArray(1, 3);

	for (var i = 0; i < data.length; i++) {
		for (var j = 1; j <= 3; j++) {
			if (("getCount" + j) in data[i]) {
				countsArray[j] += data[i]["getCount" + j]();
			}
		}
	}

	for (var i = 1; i <= 3; i++) {
		console.log("count%d=%d", i, countsArray[i]);
	}
}
