const expect = require('expect.js');
const parser = require('../lib/index.js');



describe('Parsing', () => {

    it('should convert "true" and "false" to boolean values', () => {
        const before = { foo: 'true', bar: 'false' };
        const result = parser(before);
        expect(result).to.eql({ foo: true, bar: false });
    });

    it ('should parse a nested structure properly', () => {
        const before = {
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
        const result = parser(before);
        const expected = {
            topLevel: true,
            topNumber: 1,
            foo: {
                active: true,
                number: 0,
                anotherNumber: 3.17,
            },
            bar: {
                active: false,
                number: 10,
                aString: 'yo',
                subSub: {
                    thisIsTrue: true,
                    thisIsFalse: false,
                    thisIsNumber: 0.00006
                }
            },
            justAString: 'hello',
            ipAddress: '192.168.1.101'
        }
        expect(result).to.eql(expected);

    });
});
