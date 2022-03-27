// PLEASE NOTE!

// below example is for an older version of this package and WILL NOT run correctly

const {
	ConfigSchema,
	Config,
	generateTypes,
	types: { CBoolean, CNumber, CObject, CString, CAny }
} = require("../src");

const configSchema = new ConfigSchema({
	gets: [{ x: [[CNumber]] }],
	puts: CObject,
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

const tsTypes = generateTypes({
	gets: [{ x: [[CNumber]] }],
	puts: CObject,
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

console.log(configSchema.parseConfig(conf));
