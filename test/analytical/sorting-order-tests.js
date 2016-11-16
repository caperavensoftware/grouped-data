import {expect} from 'chai';
import 'aurelia-polyfills';
import {SortingOrder} from './../../src/analytical/sorting-order';

describe('SortingOrder Tests', function() {
    var sortingOrder;

    beforeEach(function() {
        sortingOrder = new SortingOrder ();
    });
    
    it('constructor', function() {
        expect(sortingOrder).to.not.be.null;
    });
});