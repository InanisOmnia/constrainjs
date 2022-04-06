# Native Objects

Can be used in place of the native JS objects. Built with extended methods and extra control

> **PLEASE NOTE** `typeof` and `instanceof` checks will not work properly as ConstrainJS objects show up as objects, *not* as native "string" or "number" etc

## Strings

`ConstrainString(options, originalString)`

`options` - none defined yet

```js
{
    
}
```

see the example at "examples/strings.js"

## Arrays

`ConstrainArray(options, originalArray)`

`options`

```js
{
    minLength: 3, // minimum length of array
    maxLength: 5, // maximum length of array
    allowedTypes: ["string", "number", "boolean"] // an array of types allowed (written as the string returned from `typeof` check)
}
```

see the example at "examples/arrays.js"
