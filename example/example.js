let before = {
    active: 'true',
    number: '2',
    anotherNumber: '3.17',
    justAString: 'hello',
    ipAddress: '192.168.1.101'
}

let after = require('parse-strings-in-object')(before);

console.log('before:', before);
console.log('after:', after);