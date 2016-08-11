for (var i = 0; i < data.length; i++) {
	if (data[i] || data[i] === 0) {
		if (data[i] == 0) {
			data[i] = +data[i] + 10;
		}
		if (data[i] > 100) {
			data[i] = data[i] - 100;
		} else if (data[i] < 100) {
			data[i] = +data[i] + 100;
		}
	} 
}

log(data);