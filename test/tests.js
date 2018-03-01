const expect = require('chai').expect;
const parser = require('../lib/index.js');



describe('Parsing', () => {

    it('should convert "true" and "false" to boolean values', () => {
        const before = { foo: 'true', bar: 'false' };
        const result = parser(before);
        // expect(result).to.equal({ foo: true, bar: false });
        expect(result.foo).to.equal(true);
        expect(result.bar).to.equal(false);
    });

    it('should retain arrays properly', () => {
        const before = { foo: 'true', list: ['one', 'two', 'three']};
        const result = parser(before);
        expect(result).to.deep.equal({ foo: true, list: ['one', 'two', 'three']});
        expect(result.list.length).to.equal(3);
    });

    // it('should retain array of objects properly', () => {
    //     const before = { 
    //         someObjs: [
    //             {
    //                 id: 0,
    //                 value: 'hello'
    //             },
    //             {
    //                 id: 1,
    //                 value: 'world'
    //             }
    //         ]
    //     };
    //     const result = parser(before);
    //     expect(result).to.be(
    //         { 
    //             foo: 'true', 
    //             someObjs: [
    //                 {
    //                     id: 0,
    //                     value: 'hello'
    //                 },
    //                 {
    //                     id: 1,
    //                     value: 'world'
    //                 }
    //             ]
    //         }
    //     );
    // });


    // it ('should parse a nested structure properly', () => {
    //     const before = {
    //         topLevel: true,
    //         topNumber: 1,
    //         foo: {
    //             active: 'true',
    //             number: '0',
    //             anotherNumber: '3.17',
    //         },
    //         bar: {
    //             active: 'false',
    //             number: '10',
    //             aString: 'yo',
    //             subSub: {
    //                 thisIsTrue: 'true',
    //                 thisIsFalse: 'false',
    //                 thisIsNumber: '0.00006'
    //             }
    //         },
    //         justAString: 'hello',
    //         ipAddress: '192.168.1.101'
    //     }
    //     const result = parser(before);
    //     const expected = {
    //         topLevel: true,
    //         topNumber: 1,
    //         foo: {
    //             active: true,
    //             number: 0,
    //             anotherNumber: 3.17,
    //         },
    //         bar: {
    //             active: false,
    //             number: 10,
    //             aString: 'yo',
    //             subSub: {
    //                 thisIsTrue: true,
    //                 thisIsFalse: false,
    //                 thisIsNumber: 0.00006
    //             }
    //         },
    //         justAString: 'hello',
    //         ipAddress: '192.168.1.101'
    //     }
    //     expect(result).to.equal(expected);

    // });
});
