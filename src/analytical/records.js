export class RecordBase {
    isSelected;
    data;

    constructor(model) {
        this.data = model;
        this.isSelected = false;
    }
}

export class GroupingRecord extends RecordBase {
    value;

    // children can be grouping or data records
    children;
}

export class DataRecord extends RecordBase {
}