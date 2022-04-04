const ConstrainString = require("../src").builtin.ConstrainString;

const str = new ConstrainString("bob")
console.log(str.capitalize())
console.log(typeof str)