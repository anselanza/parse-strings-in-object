# Parse Strings in JS Object

## Overview
A very simple module that takes a JavaScript object and returns a new object with *string representations of booleans and numbers* converted to their proper types.

So:
 * `'true'` and `'false'` becomes `true` and `false`
 * `'1'` and `'3.147'` become `1` and `3.147`
 * `'192.168.1.1'` is left alone even though it "looks" like a number

It works recursively, so nested structures are no problem.

This module was originally inspired by the experience of using a configuration module ([rc](https://www.npmjs.com/package/rc)) and having to check things like `active === false || active === 'false'` repeatedly. I have therefore provided an example of this use case [below](#example-in-rc-config).

## Usage
Install from npm:
```
npm install parse-strings-in-object
```

There is only one argument to pass to the module - a valid JavaScript object.

```
var niceParsedObject = require('parse-strings-in-object')(yourOriginalObject)
```


## Example
```
const before = {
    active: true,
    anInt: 1,
    aFloat: 1.1,
    justAString: 'hello',
    ipAddress: '192.168.1.101'
}

let after = require("parse-strings-in-object")(before);
console.log(JSON.stringify(after, null, 4), typeof after.aFloat, 'and also a', typeof after.anInt);
```

The output will be:
```
{
    active: true,
    anInt: 1,
    aFloat: 1.1,
    justAString: 'hello',
    ipAddress: '192.168.1.101'
}
number
and also a
number
```
Notice that both ints and floats are converted correctly to the single `number` type, and a number-like string such as an IP address is left alone (stays a string).


# Example in rc config
The [rc](https://www.npmjs.com/package/rc) module for configuration loading allows hard-coded defaults (where types are respected) and also overrides `ini` files, environment variables and command-line params, where only strings are possible. This makes strict comparisons with `===` prone to bugs.

The module addresses this nicely. Just wrap the returned config object in a `parse-strings-in-object` require statement. For example:
```
const conf = require('parse-strings-in-object')(require('rc')('myapp', {
    anOrdinaryString: 'test',
    aBoolean: true,
    aNumber: 9000
}));
```
Now, if you run your app with `--aBoolean=false` or `--aNumber=9001` then you can safely check whether `aBoolean === true` or `aNumber===9000` and get the expected results.


# Why is this necessary?

JavaScript is notoriously loose with typing, so this can get you into trouble. For example, you might get configuration or JSON including strings as values:
```
'isMaster': 'true',
myNumber: '0'
```
So, now:
```
console.log(isMaster); // "true": as expected, but actually string
console.log(isMaster==true, isMaster===true); // "false false": oops
console.log(myNumber); // "0": as expected, but actually a string
console.log(typeof myNumber, myNumber==0, myNumber===0); // "string true false": hmmm
console.log(!myNumber); // "true": this is getting confusing
```


## Development and testing
Feel free to improve the module! All pull requests shall be considered.

After `npm install` you can run unit tests with Mocha like this:
```
npm run test
```