const ConfigSchema = require("./ConfigSchema");
const Config = require("./Config");
const generateTypes = require("./TypeGenerator");
const { CNumber, CBoolean, CString, CArray, CObject, CAny } = require("./CTypes");

module.exports = {
	ConfigSchema,
	Config,
	generateTypes,
	types: { CNumber, CBoolean, CString, CArray, CObject, CAny }
};
