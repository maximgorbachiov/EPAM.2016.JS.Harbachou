function testFunction() { }

function change(o) {
	o.method = 1;
}

var func = testFunction;

var obj = { method: func };

change(func);
change(obj);

console.log(func);
console.log(obj);