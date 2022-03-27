const { CType } = require("./CTypes");

class ConfigSchema {
	constructor(schema) {
		this.schema = schema;
	}

	parseConfig(conf) {
		return this.parse(conf, this.schema, []);
	}

	#getValueOf(conf, type, hierarchy) {
		const key = hierarchy.join(".");
		if (!conf.has(key)) {
			if (type.optional) {
				return undefined;
			} else {
				throw Error(`Missing property ${key}`);
			}
		}

		let value = conf.get(key);
		if (["number", "string", "boolean"].indexOf(type.typeName) > -1) {
			if (typeof value !== type.typeName) {
				throw Error(
					`Property ${key} should be a ${type.typeName}, but it is a ${typeof value} equal to ${value}`
				);
			}
		} else if (type.typeName === "array" && !Array.isArray(value)) {
			throw Error(`Property ${key} should be an array.`);
		} else if (type.typeName === "object" && typeof value !== "object") {
			throw Error(`Property ${key} should be an object, but it is a ${typeof value} equal to ${value}`);
		}

		if (type.typeName === "array" && type.nestedSchema) {
			if (
				typeof type.nestedSchema === "object" &&
				!(type.nestedSchema instanceof CType) &&
				Object.keys(type.nestedSchema).length < 1
			) {
			} else {
				const array = [];
				for (let i = 0; i < value.length; i++) {
					array[i] = this.figureStrategy(conf, type.nestedSchema, [...hierarchy, i]);
				}
				return array;
			}
		}

		return value;
	}

	figureStrategy(conf, type, hierarchy) {
		if (typeof type === "function") {
			return this.#getValueOf(conf, type(), hierarchy);
		} else if (typeof type === "object") {
			if (type instanceof CType) {
				return this.#getValueOf(conf, type, hierarchy);
			} else if (Array.isArray(type)) {
				const nested = type[0] || undefined;
				const realType = new CType("array", false, nested);
				return this.#getValueOf(conf, realType, hierarchy);
			} else {
				return this.parse(conf, type, hierarchy);
			}
		} else {
			throw Error(`Property ${hierarchy.join(".")} has an invalid type`);
		}
	}

	parse(conf, schema, hierarchy) {
		// reconstructs a copy of the object
		// const object = {};
		// for (let key of Object.keys(schema)) {
		// 	object[key] = this.figureStrategy(conf, schema[key], [...hierarchy, key]);
		// }
		// return object;

		for (let key of Object.keys(schema)) {
			this.figureStrategy(conf, schema[key], [...hierarchy, key]);
		}
		return conf;
	}
}

module.exports = ConfigSchema;
