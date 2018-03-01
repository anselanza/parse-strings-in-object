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
    ipAddress: '192.168.1.101',
    listOfNumbers: ['0', '1', '2'],
    listOfObjects: [
        {
            id: 0,
            value: 'hello'
        },
        {
            id: 1,
            value: 'world'
        }        
    ]
}

let after = require('../lib/index.js')(before);

console.log('before:', before);
console.log('after:\n', JSON.stringify(after, null, 4));