import {AnalyticalDataManager} from './../../analytical/analytical-data-manager';
import {OrderGroupItem} from "../../analytical/ordered-groups";

export class Welcome {
    data;
    analytical;

    constructor() {
        this.analytical = new AnalyticalDataManager();

        fetch('data/assets.json')
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                this.data = json.data
            }.bind(this));
    }

    doFunction1() {
        this.analytical.data = this.data;

        const developmentStatusGrouping = new OrderGroupItem("development_status", "Status", null);
        const assetTypeIdGrouping = new OrderGroupItem("asset_type_id", "Asset Type Id", developmentStatusGrouping);

        this.analytical.groupingOrder.add(developmentStatusGrouping);
        this.analytical.groupingOrder.add(assetTypeIdGrouping);

        const assetTypeIdCollection = this.analytical.getRootGroupingRecords();

        console.log(assetTypeIdCollection);

        this.analytical.getGroupingChildren(assetTypeIdCollection[0]);
    }
}