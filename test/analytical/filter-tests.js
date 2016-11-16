import {expect} from 'chai';
import {FilterOperator, Filter, FilterItem, EqualsFilterItem} from '../../src/analytical/filter';

describe('GroupingOrder Tests', function() {
    var filter;

    beforeEach(function() {
        filter = new Filter()
    });

    it('constructor', function() {
        expect(Filter).to.not.be.null;
    });

    it('add', function() {
        // Act
        filter.add(new EqualsFilterItem("Field1", "Value1"));

        // Assert
        expect(filter.filterItems.length).to.equal(1, "Filter should have one item in list");
    });

    it("allow, no items return true", function() {
        // Act
        const result = filter.allow({});

        // Assert
        expect(result).to.be.true;
    });

    it("allow, model does not match, return false", function() {
        // Arrange
        const model = {
            "Field1": "Wrong Value"
        };

        filter.add(new EqualsFilterItem("Field1", "Right Value"));

        // Act
        const result = filter.allow(model);

        // Assert
        expect(result).to.be.false;
    });

    it("allow, model has right values, return true", function() {
        // Arrange
        const model = {
            "Field1": "Right Value"
        };

        filter.add(new EqualsFilterItem("Field1", "Right Value"));

        // Act
        const result = filter.allow(model);

        // Assert
        expect(result).to.be.true;
    });
});

describe('FilterItem Tests', function() {
    var filterItem;

    beforeEach(function() {
        filterItem = new FilterItem("Field1", "Value1");
    });

    it('constructor', function() {
        expect(filterItem).to.not.be.null;
        expect(filterItem.field).to.be.equal("Field1", "filter field should be initialized value");
        expect(filterItem.value).to.be.equal("Value1", "filter value should be initialized value");
    });

    it('evaluate', function() {
        // Act
        const result = filterItem.evaluate(null);

        // Assert
        expect(result).to.be.true;
    })
});

describe('EqualsFilterItem', function() {
    var filterItem;

    beforeEach(function() {
        filterItem = new EqualsFilterItem("Field1", "Value1");
    });

    it('is not Match, no such field', function() {
        // Act
        const result = filterItem.evaluate({
            Field2: "Value2"
        });

        // Assert
        expect(result).to.be.false;
    });

    it('is not Match, wrong value', function() {
        // Act
        const result = filterItem.evaluate({
            Field1: "Value2"
        });

        // Assert
        expect(result).to.be.false;
    });

    it('Match', function() {
        // Act
        const result = filterItem.evaluate({
            Field1: "Value1"
        });

        // Assert
        expect(result).to.be.true;
    });
});