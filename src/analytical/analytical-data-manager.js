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
                return this.getRootGroupingRecords(this.groupingOrder.firstItem, this.data);
            case false:
                return this.getDataRecords(this.data);
        }
    }

    // Get all items that are allowed throught the filter
    getDataRecords(dataToProcess) {
        return new Promise(resolve => {
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

            resolve(result);
        });
    }

    // Get data according to the grouping
    getRootGroupingRecords() {
        return new Promise(resolve => {
            const set = new Set();
            const result = [];

            if (!this.groupingOrder.hasItems) {
                resolve(result);
            }

            const grouping = this.groupingOrder.firstItem;

            for(let dataItem of this.data) {
                const value = dataItem[grouping.field];

                if (set.has(value)) {
                    continue;
                }

                let groupingRecord = null;

                if (this.filter) {
                    if (this.filter.allow(dataItem)) {
                        groupingRecord = new GroupingRecord(dataItem, 0, grouping.field, value);
                    }
                }
                else {
                    groupingRecord = new GroupingRecord(dataItem, 0, grouping.field, value);
                }

                if (groupingRecord) {
                    groupingRecord.value = value;
                    groupingRecord.index = 0;
                    set.add(value);
                    result.push(groupingRecord);
                }
            }

            resolve(result);
        });
    }

    getGroupingChildren(groupingRecord) {
        return new Promise(result => {
            if (groupingRecord.children.length > 0) {
                return groupingRecord.children;
            }

            const groupFilter = this.getFilterFromGroupingItem(groupingRecord);

            const children = this.data.filter(function(dataItem) {
                return groupFilter.allow(dataItem);
            });

            groupingRecord.children = children;

            result(children);
        });
    }

    getFilterFromGroupingItem(groupingRecord) {
        const filter = new Filter();
        let record = groupingRecord;

        do {
            filter.add(new EqualsFilterItem(record.filterField, record.value));
            record = record.parent;
        } while(record);

        return filter;
    }

}