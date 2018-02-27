# Parse Strings in JS Object

JavaScript is notoriously loose with typing, so this can get you into trouble. For example, you might get configuration or JSON including strings as values:
```
'isMaster': 'true',
myNumber: '0'
```
So, now:
```
console.log(isMaster); // "true": as expected, but actually string
console.log(isMaster===true, isMaster===true); // "false false": oops
console.log(myNumber); // "0": as expected, but actually a string
console.log(!myNumber); // "true": because... JS
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
let before = {
    topLevel: true,
    topNumber: 1,
    justAString: 'hello',
    ipAddress: '192.168.1.101'
}

let after = require('parse-strings-in-object')(before);

console.log('before:', before);
console.log('after:', JSON.stringify(after, null, 4));
```

The output will be:
```
{
    "topLevel": true,
    "topNumber": 1,
    "justAString": "hello",
    "ipAddress": "192.168.1.101"
}
```

## Development and testing
Feel free to improve the module! All pull requests shall be considered.

After `npm install` you can run unit tests with Mocha like this:
```
npm run test
```