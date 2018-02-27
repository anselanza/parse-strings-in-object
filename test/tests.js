const expect = require('expect.js');
const parser = require('../lib/index.js');



describe('Parsing', function() {
    it('should convert "true" and "false" to boolean values', function() {
        const before = { foo: 'true', bar: 'false' };
        const result = parser(before);
        expect(result).to.eql({ foo: true, bar: false });
    });
});
