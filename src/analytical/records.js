export class RecordBase {
    isSelected;
    data;
    index;
    value;
    filterField;

    constructor(model, index, filterField, value) {
        this.data = model;
        this.isSelected = false;
        this.index = index;
        this.filterField = filterField;
        this.value = value;
    }

    dispose() {
        this.data = null;
        this.isSelected = null;
        this.index = null;
        this.filterField = null;
        this.value = null;
    }
}

export class GroupingRecord extends RecordBase {
    // shortcut to the parent record
    parent;

    // children can be grouping or data records
    children;

    constructor(model, index, filterField, value) {
        super(model, index, filterField, value);
        this.children = [];
    }

    dispose() {
        super.dispose();

        for(let child of this.children) {
            child.dispose();
        }

        children = null;
        parent = null;
    }
}

export class DataRecord extends RecordBase {
}