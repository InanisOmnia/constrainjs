const ConfigSchema = require("./ConfigSchema");
const generateTypes = require("./TypeGenerator");
const util = require("./util");
const { CNumber, CBoolean, CString, CArray, CObject, CAny } = require("./CTypes");

module.exports = {
    ConfigSchema, generateTypes, util, types: { CNumber, CBoolean, CString, CArray, CObject, CAny }
}

