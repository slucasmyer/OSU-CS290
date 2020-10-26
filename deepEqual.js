function deepEqual(obj1, obj2) {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);
	if (obj1Keys.length != obj2Keys.length) {
		return false;
	}
	for (const prop of obj1Keys) {
		const propVal1 = obj1[prop];
		const propVal2 = obj2[prop];
		if ((typeof(propVal1) === 'object' && propVal1 != null) && (typeof(propVal2) === 'object' && propVal2 != null)) {
			if (!deepEqual(propVal1, propVal2)) {
				return false;
			}
		}
		else {
			if (propVal1 !== propVal2) {
				return false;
			}
		}
	}
	return true;
}
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

