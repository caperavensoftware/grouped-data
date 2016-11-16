import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {AnalyticalDataManager} from './../../src/analytical/analytical-data-manager';
import {DataRecord, GroupingRecord} from "../../src/analytical/records";
import {OrderGroupItem} from "../../src/analytical/ordered-groups";
import {EqualsFilterItem, Filter} from "../../src/analytical/filter";

describe('AnalyticalDataManager Tests', function() {
    let analyticalDataManager;
    let data;

    beforeEach(function() {
        data = [
            {id: 1, code: 'code1', site: 'site1'},
            {id: 2, code: 'code2', site: 'site1'},
            {id: 3, code: 'code3', site: 'site1'},
            {id: 4, code: 'code4', site: 'site2'}
        ];

        analyticalDataManager = new AnalyticalDataManager ();
        analyticalDataManager.setData(data);
    });
    
    it('constructor', function() {
        expect(analyticalDataManager).to.not.be.null;
        expect(analyticalDataManager.groupingOrder).to.not.be.null;
        expect(analyticalDataManager.sortingOrder).to.not.be.null;
    });

    it('setData', function() {
        // Arrange
        const groupingOrderSpy = sinon.spy(analyticalDataManager.groupingOrder, "validateFromModel");
        const sortingOrderSpy = sinon.spy(analyticalDataManager.sortingOrder, "validateFromModel");
        
        const model = {
            field1: "abc"
        };

        // Act
        analyticalDataManager.setData([model]);

        // Assert
        assert(groupingOrderSpy.withArgs(model).calledOnce, 'groupingOrder validateFromModel should have been called once');
        assert(sortingOrderSpy.withArgs(model).calledOnce, 'sortingOrder validateFromModel should have been called once');
    });

    it('getInitialData, no grouping', function() {
        // Act
        const result = analyticalDataManager.getInitialData();

        // Assert
        expect(result.length).to.equal(data.length);
        assert(result[0] instanceof DataRecord, "object should be of type DataRecord");

        const length = result.length;
        for(let i = 0; i < length; i++) {
            expect(result[i].data).to.equal(data[i]);
        }
    });

    it('getInitialData, no grouping, with filter', function() {
        // Arrange
        analyticalDataManager.filter = new Filter();
        analyticalDataManager.filter.add(new EqualsFilterItem('site', 'site2'));

        // Act
        const result = analyticalDataManager.getInitialData();

        // Assert
        expect(result.length).to.equal(1, 'there should be one record after filtering');
        assert(result[0] instanceof DataRecord, 'result should be of type DataRecord');
    });

    it('getInitlaData, with grouping', function() {
        // Arrange
        analyticalDataManager.groupingOrder.add(new OrderGroupItem('site', 'site', null));

        // Act
        const result = analyticalDataManager.getInitialData();

        // Assert
        expect(result.length).to.equal(2, 'there should be two grouping items');
        assert(result[0] instanceof GroupingRecord, "object should be of type GroupingRecord");
        expect(result[0].value).to.equal('site1');
        expect(result[1].value).to.equal('site2');
    });

    it('getInitialData, with grouping and filter', function() {
        // Arrange
        analyticalDataManager.groupingOrder.add(new OrderGroupItem('site', 'site', null));
        analyticalDataManager.filter = new Filter();
        analyticalDataManager.filter.add(new EqualsFilterItem('id', 1));

        // Act
        const result = analyticalDataManager.getInitialData();

        // Assert
        expect(result.length).to.equal(1, 'there should be 1 items');
        assert(result[0] instanceof GroupingRecord, "object should be of type GroupingRecord");
        expect(result[0].value).to.equal('site1');
    });
});