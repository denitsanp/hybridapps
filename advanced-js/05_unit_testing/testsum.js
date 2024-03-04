import { expect } from 'chai';
import { sum } from './sum.js'; 

describe('sum', function() {
    it('should return the sum of all numbers in an array', function() {
        expect(sum([1, 2, 3])).to.equal(6);
    });

    it('should return 0 for an empty array', function() {
        expect(sum([])).to.equal(0);
    });

    it('should correctly handle negative numbers', function() {
        expect(sum([-1, -2, -3, 6])).to.equal(0);
    });

    it('should handle numeric string values by converting them to numbers', function() {
        expect(sum(['1', '2', '3'])).to.equal(6);
    });
});
