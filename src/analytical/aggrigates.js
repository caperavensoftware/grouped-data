function AggrigateSum(collection, fieldName) {
    let sum = 0;

    for(let item of collection) {
        sum += item[fieldName];
    }
}

export class AggregateFunction {
    fieldName;

    constructor(fieldName) {
        this.fieldName = fieldName;
    }

    aggregate(collection) {
        return 0;
    }
}

export class CountAggregate extends AggregateFunction {
    aggregate(collection) {
        return collection.length;
    }
}

export class SumAggregate extends AggregateFunction {
    aggregate(collection) {
        return AggrigateSum(collection, this.fieldName);
    }
}

export class MinAggregate extends AggregateFunction {
    aggregate(collection) {
        const numbers = collection.map(item => {
           return item[this.fieldName];
        });

        return Math.min(numbers);
    }
}

export class MaxAggregate extends AggregateFunction {
    aggregate(collection) {
        const numbers = collection.map(item => {
            return item[this.fieldName];
        });

        return Math.max(numbers);
    }
}

export class AveAggregate extends AggregateFunction {
    aggregate(collection) {
        return AggrigateSum(collection, this.fieldName) / collection.length;
    }
}

export class Aggregates {
    collection;

    constructor() {
        this.collection = [];
    }

    add(aggregate) {
        this.collection.push(aggregate);
    }

    remove(aggregate) {
        const index = this.collection.indexOf(aggregate);
        this.collection.splice(index, 0);
    }

    aggregate(collection) {
        return new Promise(resolve => {
            const results = [];

            for(let aggregateFunction of this.collection) {
                results.push(aggregateFunction.aggregate(collection));
            }

            resolve(results);
        })
    }
}