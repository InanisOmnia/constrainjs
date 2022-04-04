const util = require("../util");

class Config {
	constructor(raw) {
		// if(util.isObject(raw)) {

		// } else if(typeof raw === "string") {
		// 	// TODO: allow filepath and read it myself or a normal object
		// }
		// // TODO: parse conf as valid JSON
        this.raw = raw;
    }

	/**
	 * Underlying get mechanism
	 *
	 * @private
	 * @method getImpl
	 * @param object {object} - Object to get the property for
	 * @param property {string|string[]} - The property name to get (as an array or '.' delimited string)
	 * @return value {*} - Property value, including undefined if not defined.
	 */
	#getImpl(object, property) {
		const elems = Array.isArray(property) ? property : property.split(".");
		const name = elems[0];
		const value = object[name];
		if (elems.length <= 1) {
			return value;
		}
		// Note that typeof null === 'object'
		if (value === null || typeof value !== "object") {
			return undefined;
		}
		return this.#getImpl(value, elems.slice(1));
	}

	get(property) {
		if (property === null || property === undefined) {
			throw new Error("Calling config.get with null or undefined argument");
		}

		const value = this.#getImpl(this.raw, property);

		// Produce an exception if the property doesn't exist
		if (value === undefined) {
			throw new Error('Configuration property "' + property + '" is not defined');
		}

		return value;
	}

	has(property) {
		// While get() throws an exception for undefined input, has() is designed to test validity, so false is appropriate
		if (property === null || property === undefined) {
			return false;
		}
		return this.#getImpl(this.raw, property) !== undefined;
	}
}

module.exports = Config