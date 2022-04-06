const { ConstrainString}  = require("constrainjs").native;

const myString = "hello world";
console.log(myString);

const myBetterString = new ConstrainString({}, myString)
console.log(myBetterString);
// Now the variable can still be used as if it were a normal string.
// and with access to extra builtin methods

myBetterString.capitalize()
console.log(myBetterString);