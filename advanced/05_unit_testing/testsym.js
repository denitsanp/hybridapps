import { expect } from 'chai';
import { isSymmetric } from './symmetry.js'; 

describe('isSymmetric', function() {
    it('should return true for symmetric array with odd number of elements', function() {
        expect(isSymmetric([1, 2, 3, 2, 1])).to.be.true;
    });

    it('should return true for symmetric array with even number of elements', function() {
        expect(isSymmetric([1, 2, 2, 1])).to.be.true;
    });

    it('should return false for non-symmetric array', function() {
        expect(isSymmetric([1, 2, 3])).to.be.false;
    });

    it('should return false for non-array inputs', function() {
        expect(isSymmetric("not an array")).to.be.false;
    });

    it('should return true for an empty array', function() {
        expect(isSymmetric([])).to.be.true;
    });
});
