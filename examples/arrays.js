const ConstrainArray = require("../src").native.ConstrainArray;

const arr = ConstrainArray.build(
	{minLength: 2, maxLength: 5, allowedTypes: ["string", "boolean"]},
	["hello", true, "world"]
);

// behaves and can be interacted with just like a normal array
// allows for more control e.g. max and min array sizes, fixed types etc
// provides further functionality e.g. shuffle method
// does not mutate or affect native array object

console.log(arr);
/*
ConstrainArray(3) [
	'hello',
	true,
	'world',
	_options: { minLength: 2, maxLength: 5, allowedTypes: [ 'string', 'boolean' ] }
]
*/

console.log(arr.toString());
/*
'hello', true, 'world'
*/

