/**
 * 
 * @typedef {Object} CTypeOptions
 * @property {Boolean} [optional] whether property is optional
 * @property {CType} [nestedSchema] the schema for the content of a nested property
 */

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CString = function CString(options) {
	return new CType("string", options);
};

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CNumber = function CNumber(options) {
	return new CType("number", options);
};

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CBoolean = function CBoolean(options) {
	return new CType("boolean", options);
};

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CArray = function CArray(options) {
	return new CType("array", options);
};

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CAny = function CAny(options) {
	return new CType("any", options);
};

/**
 * 
 * @param {CTypeOptions} options options for object type constraints
 * @returns 
 */
module.exports.CObject = function CObject(options) {
	return new CType("object", options);
};

class CType {
	constructor(type, options) {
		this.typeName = type;
		this.options = options;

		this.optional = this.options?.optional;
		this.nestedSchema = this.options?.nestedSchema;
	}
}

module.exports.CType = CType;
