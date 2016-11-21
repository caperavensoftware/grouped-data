import {expect} from 'chai';
import 'aurelia-polyfills';
import {Aggregates} from './../../src/analytical/aggrigates';

describe('Aggregates Tests', function() {
    var aggrigates;

    beforeEach(function() {
        aggrigates = new Aggregates ();
    });
    
    it('constructor', function() {
        expect(aggrigates).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Aggregates()).to.throw("Cannot call a class as a function");
    });    
})