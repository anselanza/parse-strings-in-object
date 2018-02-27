let before = {
    active: 'true',
    number: '2',
    anotherNumber: '3.17'
}

let after = require('parse-strings-in-object')(before);

console.log(after);