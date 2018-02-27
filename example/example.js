let before = {
    topLevel: true,
    topNumber: 1,
    foo: {
        active: 'true',
        number: '0',
        anotherNumber: '3.17',
    },
    bar: {
        active: 'false',
        number: '10',
        aString: 'yo',
        subSub: {
            thisIsTrue: 'true',
            thisIsFalse: 'false',
            thisIsNumber: '0.00006'
        }
    },
    justAString: 'hello',
    ipAddress: '192.168.1.101'
}

let after = require('parse-strings-in-object')(before);

console.log('before:', before);
console.log('after:\n', JSON.stringify(after, null, 4));