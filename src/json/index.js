const ConfigSchema = require("./ConfigSchema");
const Config = require("./Config");
const generateTypes = require("./TypeGenerator");
const util = require("./util");
const { CNumber, CBoolean, CString, CArray, CObject, CAny } = require("./CTypes");

module.exports = {
	ConfigSchema,
	Config,
	generateTypes,
	util,
	types: { CNumber, CBoolean, CString, CArray, CObject, CAny }
};
