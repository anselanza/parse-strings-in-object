# Parse Strings in JS Object

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

This simple module reads your JS Object recursively and converts string values to their proper types.

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

## Development and testing
Feel free to improve the module! All pull requests shall be considered.

After `npm install` you can run unit tests with Mocha like this:
```
npm run test
```