import {GroupingOrder} from "./grouping-order";

export class FilterItem {
    field;
    value;

    constructor(field, value) {
        this.field = field;
        this.value = value;
    }

    evaluate(model) {
        return true;
    }
}

export class EqualsFilterItem extends FilterItem {
    evaluate(model) {
        return model[this.field] == this.value;
    }
}

export class Filter {
    filterItems;

    constructor() {
        this.filterItems = [];
    }

    add(filterItem) {
        this.filterItems.push(filterItem);
    }

    allow(model) {
        // If there is no filter items allow everything
        if (this.filterItems.length === 0) {
            return true;
        }

        // If there are filters, return true unless one of them failed
        for(let filterItem of this.filterItems) {
            if (!filterItem.evaluate(model)) {
                return false;
            }
        }

        return true;
    }
}
