const constrainjs = require("../src");

const {ConfigSchema, Config, types: {CBoolean, CString, CNumber, CArray, CObject, CAny}, generateTypes} = constrainjs.json


const configSchema = new ConfigSchema({
	gets: [
        { x: [CNumber] }
    ],
	puts: [
        { x: CArray({nestedSchema:CNumber}) }
    ],
	database: {
		host: CString,
		credentials: {
			does: CBoolean,
			auth: CBoolean,
			user: CString,
			pass: CString
		}
	}
});

const tsTypes = generateTypes(configSchema);
console.log(tsTypes);

const conf = new Config({
	gets: [{ x: [[1]] }, { x: [[2]] }, { x: [[3]] }],
	puts: {
		someProp: "doesThis"
	},
	database: {
		host: "localhost",
		credentials: {
			does: true,
			auth: false,
			user: "Test",
			pass: "testAgain"
		}
	}
});

console.log(configSchema.parseConfig(conf))
// throws an error and explains the misconfiguration (puts property should be an array, not an object)