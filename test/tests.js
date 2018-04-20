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

    it('should retain actual null values without errors', () => {
        const before = { foo: 'true', bar: null };
        const result = parser(before);
        // expect(result).to.equal({ foo: true, bar: false });
        expect(result.foo).to.equal(true);
        expect(result.bar).to.equal(null);
    });

    it('should convert string representations of nulls into real nulls', () => {
        const before = { foo: 'true', bar: 'null' };
        const result = parser(before);
        // expect(result).to.equal({ foo: true, bar: false });
        expect(result.foo).to.equal(true);
        expect(result.bar).to.equal(null);
    });

    it('should retain actual undefined values without errors', () => {
        const before = { foo: 'true', bar: undefined };
        const result = parser(before);
        // expect(result).to.equal({ foo: true, bar: false });
        expect(result.foo).to.equal(true);
        expect(result.bar).to.equal(undefined);
        expect(result.bar).to.be
    });

    it('should retain arrays properly', () => {
        const before = { foo: 'true', list: ['one', 'two', 'three']};
        const result = parser(before);
        expect(result).to.deep.equal({ foo: true, list: ['one', 'two', 'three']});
        expect(result.list.length).to.equal(3);
    });

    it('should convert string representations of numbers into real numbers', () => {
        const before = { aNumber: '1', another: '0', andAnother: '42' };
        const result = parser(before);
        expect(result.aNumber).to.equal(1);
        expect(typeof result.aNumber).to.equal('number');
        expect(typeof result.another).to.equal('number');
        expect(typeof result.andAnother).to.equal('number');
    });

    it('should retain array of objects properly', () => {
        const before = { 
            foo: 'true',
            someObjs: [
                {
                    id: 0,
                    value: 'hello'
                },
                {
                    id: 1,
                    value: 'world'
                }
            ]
        };
        const result = parser(before);
        expect(result).to.deep.equal(
            { 
                foo: true, 
                someObjs: [
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
        );
        expect(result.foo).to.equal(true);
        expect(result.someObjs.length).to.equal(2);
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
                somethingNull: null,
                subSub: {
                    thisIsTrue: 'true',
                    thisIsFalse: 'false',
                    thisIsNumber: '0.00006'
                }
            },
            justAString: 'hello',
            ipAddress: '192.168.1.101',
            alsoNull: 'null'
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
                somethingNull: null,
                subSub: {
                    thisIsTrue: true,
                    thisIsFalse: false,
                    thisIsNumber: 0.00006
                }
            },
            justAString: 'hello',
            ipAddress: '192.168.1.101',
            alsoNull: null
        }
        expect(result).to.deep.equal(expected);
        expect(result.topLevel).to.equal(true);
        expect(result.foo.active).to.equal(true);
        expect(result.ipAddress).to.equal('192.168.1.101');
        expect(result.bar.subSub.thisIsFalse).to.equal(false);
        expect(result.bar.subSub.thisIsNumber).to.equal(0.00006);
    });
});
