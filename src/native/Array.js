class ConstrainArray extends Array {
	constructor(options, arr) {
		super(...arr)
		this._options = options;
	}

	static build(options, originalArray) {
		const { opts, arr } = parseOptions(options, originalArray);
		return new Proxy(new ConstrainArray(opts, arr), createHandler(opts));
	}
}

ConstrainArray.prototype.shuffle = function shuffle() {
	let currentIndex = this.length;
	let randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[this[currentIndex], this[randomIndex]] = [this[randomIndex], this[currentIndex]];
	}

	return this;
};

// ConstrainArray.prototype.toString = function toString() {
	
// }

module.exports = ConstrainArray;

function createHandler(options) {
	return {
		set: function (target, property, value, receiver) {
			let prop = isNaN(parseInt(property)) ? property : parseInt(property);

			if (typeof prop === "number") {
				if (!options.allowedTypes.includes(typeof value)) {
					throw new TypeError(
						"typeof Value " + value + " (" + typeof value + ") " + " is not in the list of allowed types"
					);
				}
			}

			if (prop === "length") {
				if (value > options.maxLength) {
					throw new RangeError(
						"Array size cannot exceed " + options.maxLength + " as specified by maxLength option"
					);
				}
				if (value < options.minLength) {
					throw new RangeError(
						"Array size cannot be reduced to less than " +
							options.minLength +
							" as specified by minLength option"
					);
				}
			}

			return Reflect.set(target, property, value, receiver);
		},
		deleteProperty(target, prop) {
			if (prop < options.minLength) {
				throw new RangeError(
					"Array size cannot be reduced to less than " +
						options.minLength +
						" as specified by minLength option"
				);
				return false;
			}
			return Reflect.deleteProperty(target, prop);
		}
	};
}

function parseOptions(options, originalArray) {
	let arr = originalArray || [];

	if (typeof options.minLength === "number") {
		arr = Array(options.minLength);
		if (originalArray) {
			if (originalArray.length >= options.minLength) {
				arr.splice(0, originalArray.length, ...originalArray);
			}
		}
	} else {
		options.minLength = 0;
	}

	if (typeof options.maxLength === "number") {
		if (originalArray)
			if (originalArray.length > options.maxLength) {
				throw RangeError(
					"Array to convert is already over the maxLength " +
						options.maxLength +
						" as specified in maxLength option"
				);
			}
	} else {
		options.maxLength = Infinity;
	}

	if (options.maxLength < options.minLength) {
		throw new RangeError("maxLength must be less than or equal to minLength");
	}

	if (options.allowedTypes.length) {
		if (originalArray) {
			for (const elt of originalArray) {
				if (!options.allowedTypes.includes(typeof elt)) {
					throw new TypeError(
						"typeof element in original array '" +
							elt +
							"' (" +
							typeof elt +
							") " +
							" is not in the list of allowed types"
					);
				}
			}
		}
	}

	return { opts: options, arr };
}
