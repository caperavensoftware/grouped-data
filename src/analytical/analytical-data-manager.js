import {GroupingOrder} from "./grouping-order";
import {SortingOrder} from "./sorting-order";
import {OrderGroupItem} from "./ordered-groups";
import {Filter, EqualsFilterItem} from "./filter";
import {DataRecord, GroupingRecord} from "./records";


export class AnalyticalDataManager {
    groupingOrder;
    sortingOrder;
    data;
    filter;

    constructor() {
        this.groupingOrder = new GroupingOrder();
        this.sortingOrder = new SortingOrder();
    }

    setData(data) {
        this.data = data;
        
        if (this.data.length > 0) {
            const model = this.data[0];

            this.groupingOrder.validateFromModel(model);
            this.sortingOrder.validateFromModel(model);

            this.getInitialData();
        }
    }

    lastGroupingItem() {
        const length = this.groupingOrder.groupings.length;
        return length > 0 ? this.groupingOrder.groupings[length -1] : null;
    }

    getInitialData() {
        switch(this.groupingOrder.hasItems) {
            case true:
                return this.getGroupingRecords(this.groupingOrder.firstItem, this.data);
            case false:
                return this.getDataRecords(this.data);
        }
    }

    getDataRecords(dataToProcess) {
        const result = [];

        for(let dataItem of dataToProcess) {
            let dataRecord = null;

            if (this.filter) {
                if (this.filter.allow(dataItem)) {
                    dataRecord = new DataRecord(dataItem);
                }
            }
            else {
                dataRecord = new DataRecord(dataItem);
            }

            if (dataRecord) {
                result.push(dataRecord);
            }
        }

        return result;
    }

    getGroupingRecords(grouping, dataToProcess) {
        const set = new Set();
        const result = [];

        for(let dataItem of dataToProcess) {
            const value = dataItem[grouping.field];

            if (set.has(value)) {
                continue;
            }

            let groupingRecord = null;

            if (this.filter) {
                if (this.filter.allow(dataItem)) {
                    groupingRecord = new GroupingRecord(dataItem);
                }
            }
            else {
                groupingRecord = new GroupingRecord(dataItem);
            }

            if (groupingRecord) {
                groupingRecord.value = value;
                set.add(value);
                result.push(groupingRecord);
            }
        }

        return result;
    }

}