import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {OrderGroup, OrderGroupItem} from '../../src/analytical/ordered-groups';

describe('OrderGroup Tests', function() {
    var groupings;

    beforeEach(function() {
        groupings = new OrderGroup ();
    });
    
    it('constructor', function() {
        expect(groupings).to.not.be.null;
        expect(groupings.groupings).not.to.be.null;
    });

    it('add', function() {
        // Arrange
        const grouping = new OrderGroupItem("field1", "Field 1");

        // Act
        groupings.add(grouping);

        // Assert
        expect(groupings.groupings.length).to.equal(1, "groupings should have one item");
    });

    it('insert', function() {
        // Arrange
        const group1 = new OrderGroupItem("field1", "Field 1");
        const group2 = new OrderGroupItem("field2", "Field 2");
        const group3 = new OrderGroupItem("field3", "Field 3");

        groupings.add(group1);
        groupings.add(group2);

        expect(group2.parent).to.equal(group1, 'group2 parent should be group1');

        // Act
        groupings.insert(group3, 1);

        // Assert
        expect(groupings.groupings.length).to.equal(3);
        expect(groupings.groupings[0].field).to.equal("field1");
        expect(groupings.groupings[1].field).to.equal("field3");
        expect(groupings.groupings[2].field).to.equal("field2");

        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group3, 'group2 parent should be group3');
        expect(group3.parent).to.equal(group1, 'group3 parent should be group1');
    });

    it('remove', function() {
        // Arrange
        const group1 = new OrderGroupItem("field1", "Field 1");
        const group2 = new OrderGroupItem("field2", "Field 2");
        const group3 = new OrderGroupItem("field3", "Field 3");

        groupings.add(group1);
        groupings.add(group2);
        groupings.add(group3);

        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group1, 'group2 parent should be group1');
        expect(group3.parent).to.equal(group2, 'group3 parent should be group2');

        // Act
        groupings.remove(group2);

        // Assert
        expect(groupings.groupings.length).to.be.equal(2, "groupings should have 2 items");
        expect(group2.parent).to.be.null;
        expect(group3.parent).to.equal(group1, "group3 parent should be group1");
    });

    it('move', function() {
        // Arrange
        const group1 = new OrderGroupItem("field1", "Field 1");
        const group2 = new OrderGroupItem("field2", "Field 2");
        const group3 = new OrderGroupItem("field3", "Field 3");
        const group4 = new OrderGroupItem("field4", "Field 4");
        const group5 = new OrderGroupItem("field5", "Field 5");

        groupings.add(group1);
        groupings.add(group2);
        groupings.add(group3);
        groupings.add(group4);
        groupings.add(group5);

        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group1, 'group2 parent should be group1');
        expect(group3.parent).to.equal(group2, 'group3 parent should be group2');
        expect(group4.parent).to.equal(group3, 'group4 parent should be group3');
        expect(group5.parent).to.equal(group4, 'group5 parent should be group4');

        // Act
        groupings.move(1, 3);

        // Assert
        expect(groupings.groupings.length).to.equal(5, 'grouping should be 5 items after move');
        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group4, 'group2 parent should be group3');
        expect(group3.parent).to.equal(group1, 'group3 parent should be group2');
        expect(group4.parent).to.equal(group3, 'group4 parent should be group3');
        expect(group5.parent).to.equal(group2, 'group5 parent should be group4');
    });

    it('clear', function() {
        // Arrange
        const group1 = new OrderGroupItem("field1", "Field 1");
        const group2 = new OrderGroupItem("field2", "Field 2");
        
        // Act
        groupings.add(group1);
        groupings.add(group2);

        // Assert
        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group1, 'group2 parent should be group1');

        // Act
        groupings.clear();

        // Assert
        assert(groupings.groupings);
        expect(groupings.groupings.length).to.equal(0);
        expect(group1.parent).to.be.null;
        expect(group2.parent).to.be.null;
    });

    it('validateFromModel', function() {
        // Arrange
        const group1 = new OrderGroupItem("field1", "Field 1");
        const group2 = new OrderGroupItem("field2", "Field 2");
        const group3 = new OrderGroupItem("field3", "Field 3");
        
        // Act
        groupings.add(group1);
        groupings.add(group2);
        groupings.add(group3);

        // Assert
        expect(group1.parent).to.be.null;
        expect(group2.parent).to.equal(group1, 'group2 parent should be group1');
        expect(group3.parent).to.equal(group2, 'group3 parent should be group2');

        // Act
        groupings.validateFromModel({
            field1: "ABC",
            field3: "DEF"
        });

        // Assert
        assert(groupings.groupings);
        expect(groupings.groupings.length).to.equal(2);
        expect(group1.parent).to.be.null;
        expect(group2.parent).to.be.null;
        expect(group3.parent).to.be.equal(group1);
    })
});