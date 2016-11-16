import {expect} from 'chai';
import 'aurelia-polyfills';
import {GroupingOrder} from '../../src/analytical/grouping-order';

describe('GroupingOrder Tests', function() {
    var grouping;

    beforeEach(function() {
        grouping = new GroupingOrder ();
    });
    
    it('constructor', function() {
        expect(grouping).to.not.be.null;
    });
});