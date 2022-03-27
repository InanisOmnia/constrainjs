/**
 *
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CString = function CString(optional) {
	return new CType("string", optional === true);
};

/**
 *
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CNumber = function CNumber(optional) {
	return new CType("number", optional === true);
};

/**
 *
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CBoolean = function CBoolean(optional) {
	return new CType("boolean", optional === true);
};

/**
 *
 * @param {CType?} nestedSchema The schema of any contained elements (for simplicity the array can be written as a literal in the schema definition)
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CArray = function CArray(nestedSchema, optional) {
	return new CType("array", optional === true, nestedSchema);
};

/**
 *
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CAny = function CAny(optional) {
	return new CType("any", optional === true);
};

/**
 *
 * @param {Boolean?} optional whether config parameter is optional
 * @returns {CType}
 */
module.exports.CObject = function CObject(optional) {
	return new CType("object", optional === true);
};

class CType {
	constructor(type, optional, nestedSchema) {
		this.typeName = type;
		this.optional = optional;
		this.nestedSchema = nestedSchema;
	}
}

module.exports.CType = CType;
