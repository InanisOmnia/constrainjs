# constrainjs
 A schema definition for JSON files and objects

> **WARNING** Major updates are being made to this package without a version change as this package is not made for public release yet

# Quick Start Guide

- [constrainjs](#constrainjs)
- [Quick Start Guide](#quick-start-guide)
	- [Requiring the module](#requiring-the-module)
	- [Defining Schemas](#defining-schemas)
		- [Getting .ts Type Definition](#getting-ts-type-definition)
	- [Defining Configurations](#defining-configurations)
	- [Testing Configuration Validity](#testing-configuration-validity)
- [Compatibility](#compatibility)

> **See our [docs](docs/index.md)** for further documentation

## Requiring the module

```js
// Require the entire module as an object
const constrainjs = require("constrainjs");

// and access its parts separately
/*
constrainjs.json.ConfigSchema
constrainjs.json.Config
constrainjs.json.types.CString
*/

// Or use object destructuring to get the individual components
const {	json: {ConfigSchema, Config, types}} = require("constrainjs");
```

## Defining Schemas

```js
const schema = new ConfigSchema({
	database: {
		host: types.CString,
		credentials: {
			does: types.CBoolean,
			auth: types.CBoolean,
			user: types.CString,
			pass: types.CString
		}
	}
});
```

Optionally, the types can be called as functions and options passed in

```js
const schema = new ConfigSchema({
	database: {
		credentials: {
			does: types.CBoolean({optional: true}),
		}
	}
});
```

### Getting .ts Type Definition

```js
const tsTypes = new generateTypes(schema); // or directly provide an object with constrainjs notation (as shown passed into ConfigSchema)
```


## Defining Configurations

```js
const conf = new Config({
	database: {
		host: "localhost",
		credentials: {
			does: true,
			auth: false,
			user: "username",
			pass: "password"
		}
	}
});
```

## Testing Configuration Validity

```js
schema.parseConfig(conf)
```

The method throws an error if the configuration does not conform to the schema, otherwise the configuration is returned.

# Compatibility

See [compatibility table](docs/compatibility.md)