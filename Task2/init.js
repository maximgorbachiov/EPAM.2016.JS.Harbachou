function initData() {
	var data = [];

	for (var i = 0; i < 5; i++) {
		var rand = random(1, 3);

		switch (rand) {
			case 1: data[i] = createInstanceType(1);
					traceInit(1, data[i].getCount1()); 
					break;
			case 2: data[i] = createInstanceType(2);
					traceInit(2, data[i].getCount2()); 
					break;
			case 3: data[i] = createInstanceType(3);
					traceInit(3, data[i].getCount3()); 
					break;
		}
	}

	traceResult(data);
}

function createInstanceType(i) {
	var obj = { 
		count: random(1, 10)
	};

	obj["getCount" + i] = function() {
		return this.count;
	}

	return obj;
}

function createEmptyArray(startIndex, count) {
	var result = [];

	for (var i = startIndex; i < count + startIndex; i++) {
		result[i] = 0;
	}

	return result;
}

initData();