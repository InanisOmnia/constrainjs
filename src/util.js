const Utils = require("util");

/**
 * Return a deep copy of the specified object.
 *
 * This returns a new object with all elements copied from the specified
 * object. Deep copies are made of objects and arrays so you can do anything
 * with the returned object without affecting the input object.
 *
 * @protected
 * @method cloneDeep
 * @param parent {object} The original object to copy from
 * @param [depth=20] {Integer} Maximum depth (default 20)
 * @return {object} A new object with the elements copied from the copyFrom object
 *
 */
module.exports.cloneDeep = function cloneDeep(parent, depth, circular, prototype) {
	// maintain two arrays for circular references, where corresponding parents
	// and children have the same index
	var allParents = [];
	var allChildren = [];

	var useBuffer = typeof Buffer != "undefined";

	if (typeof circular === "undefined") circular = true;

	if (typeof depth === "undefined") depth = 20;

	// recurse this function so we don't reset allParents and allChildren
	function _clone(parent, depth) {
		// cloning null always returns null
		if (parent === null) return null;

		if (depth === 0) return parent;

		var child;
		if (typeof parent != "object") {
			return parent;
		}

		if (Utils.types.isArray(parent)) {
			child = [];
		} else if (Utils.types.isRegExp(parent)) {
			child = new RegExp(parent.source, util.getRegExpFlags(parent));
			if (parent.lastIndex) child.lastIndex = parent.lastIndex;
		} else if (Utils.types.isDate(parent)) {
			child = new Date(parent.getTime());
		} else if (useBuffer && Buffer.isBuffer(parent)) {
			child = Buffer.alloc(parent.length);
			parent.copy(child);
			return child;
		} else {
			if (typeof prototype === "undefined") child = Object.create(Object.getPrototypeOf(parent));
			else child = Object.create(prototype);
		}

		if (circular) {
			var index = allParents.indexOf(parent);

			if (index != -1) {
				return allChildren[index];
			}
			allParents.push(parent);
			allChildren.push(child);
		}

		for (var i in parent) {
			var propDescriptor = Object.getOwnPropertyDescriptor(parent, i);
			var hasGetter = propDescriptor !== undefined && propDescriptor.get !== undefined;

			if (hasGetter) {
				Object.defineProperty(child, i, propDescriptor);
			} else if (util.isPromise(parent[i])) {
				child[i] = parent[i];
			} else {
				child[i] = _clone(parent[i], depth - 1);
			}
		}

		return child;
	}

	return _clone(parent, depth);
};

/**
 * Sets a value at the path (given as a string list) of a given object no matter the current content depth
 *
 * @protected
 * @method setPath
 * @param object {object} - Object to set the property on
 * @param path {array[string]} - Array path to the property
 * @param value {*} - value to set, ignoring null
 */
module.exports.setPath = function setPath(object, path, value) {
	var nextKey = null;
	if (value === null || path.length === 0) {
		return;
	} else if (path.length === 1) {
		// no more keys to make, so set the value
		object[path.shift()] = value;
	} else {
		nextKey = path.shift();
		if (!Object.hasOwnProperty.call(object, nextKey)) {
			object[nextKey] = {};
		}
		util.setPath(object[nextKey], path, value);
	}
};

/**
 * Return true if two objects have equal contents.
 *
 * @protected
 * @method equalsDeep
 * @param object1 {object} The object to compare from
 * @param object2 {object} The object to compare with
 * @param depth {integer} An optional depth to prevent recursion.  Default: 20.
 * @return {boolean} True if both objects have equivalent contents
 */
module.exports.equalsDeep = function equalsDeep(object1, object2, depth) {
	// Recursion detection
	var t = this;
	depth = depth === null ? DEFAULT_CLONE_DEPTH : depth;
	if (depth < 0) {
		return {};
	}

	// Fast comparisons
	if (!object1 || !object2) {
		return false;
	}
	if (object1 === object2) {
		return true;
	}
	if (typeof object1 != "object" || typeof object2 != "object") {
		return false;
	}

	// They must have the same keys.  If their length isn't the same
	// then they're not equal.  If the keys aren't the same, the value
	// comparisons will fail.
	if (Object.keys(object1).length != Object.keys(object2).length) {
		return false;
	}

	// Compare the values
	for (var prop in object1) {
		// Call recursively if an object or array
		if (object1[prop] && typeof object1[prop] === "object") {
			if (!util.equalsDeep(object1[prop], object2[prop], depth - 1)) {
				return false;
			}
		} else {
			if (object1[prop] !== object2[prop]) {
				return false;
			}
		}
	}

	// Test passed.
	return true;
};

/**
 * Returns an object containing all elements that differ between two objects.
 * <p>
 * This method was designed to be used to create the runtime.json file
 * contents, but can be used to get the diffs between any two Javascript objects.
 * </p>
 * <p>
 * It works best when object2 originated by deep copying object1, then
 * changes were made to object2, and you want an object that would give you
 * the changes made to object1 which resulted in object2.
 * </p>
 *
 * @protected
 * @method diffDeep
 * @param object1 {object} The base object to compare to
 * @param object2 {object} The object to compare with
 * @param depth {integer} An optional depth to prevent recursion.  Default: 20.
 * @return {object} A differential object, which if extended onto object1 would
 *                  result in object2.
 */
module.exports.diffDeep = function diffDeep(object1, object2, depth) {
	// Recursion detection
	var t = this,
		diff = {};
	depth = depth === null ? DEFAULT_CLONE_DEPTH : depth;
	if (depth < 0) {
		return {};
	}

	// Process each element from object2, adding any element that's different
	// from object 1.
	for (var parm in object2) {
		var value1 = object1[parm];
		var value2 = object2[parm];
		if (value1 && value2 && util.isObject(value2)) {
			if (!util.equalsDeep(value1, value2)) {
				diff[parm] = util.diffDeep(value1, value2, depth - 1);
			}
		} else if (Array.isArray(value1) && Array.isArray(value2)) {
			if (!util.equalsDeep(value1, value2)) {
				diff[parm] = value2;
			}
		} else if (value1 !== value2) {
			diff[parm] = value2;
		}
	}

	// Return the diff object
	return diff;
};

/**
 * Is the specified argument a regular javascript object?
 *
 * The argument is an object if it's a JS object, but not an array.
 *
 * @protected
 * @method isObject
 * @param obj {*} An argument of any type.
 * @return {boolean} TRUE if the arg is an object, FALSE if not
 */
module.exports.isObject = function isObject(obj) {
	return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

/**
 * Is the specified argument a javascript promise?
 *
 * @protected
 * @method isPromise
 * @param obj {*} An argument of any type.
 * @returns {boolean}
 */
module.exports.isPromise = function isPromise(obj) {
	return Object.prototype.toString.call(obj) === "[object Promise]";
};

/**
 * Returns a new deep copy of the obj.
 *
 * @param {Object} obj The object to copy and serialize
 * @returns {Object} The cloned object
 */
module.exports.toObject = function toObject(obj) {
	return JSON.parse(JSON.stringify(obj));
};
