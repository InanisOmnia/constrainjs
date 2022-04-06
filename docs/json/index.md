# JSON

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
const {	ConfigSchema, Config, types: {CBoolean, CString, CNumber, CAny}} = require("constrainjs").json;
```

## Defining Schemas

```js
const schema = new ConfigSchema({
	database: {
		host: CString,
		credentials: {
			does: CBoolean,
			auth: CBoolean,
			user: CString,
			pass: CString
		}
	}
});
```

Optionally, the types can be called as functions and options passed in

```js
const schema = new ConfigSchema({
	database: {
		credentials: {
			does: CBoolean({optional: true}),
		}
	}
});
```

### Getting .ts Type Definition

```js
const tsTypes = new generateTypes(schema); // or directly provide an object with constrainjs notation (as shown passed into ConfigSchema above)
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
try {
	schema.parseConfig(conf)
} catch(e) {
	// failed
	console.error(e)
}
```

The method throws an error if the configuration does not conform to the schema, otherwise the configuration is returned.
