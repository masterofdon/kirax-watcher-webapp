import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class TabletsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getTablets(page, size) {
        var apiStr = new ApiStringBuilder()
            .tablets()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getAllTablets() {
        var apiStr = new ApiStringBuilder()
            .tablets("all")
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getTablet(id) {
        var apiStr = new ApiStringBuilder().
            tablets(id)
            .toString();
        return Axios.get(apiStr);
    }

    changeTablets(tabletchanges){
        var apiStr = new ApiStringBuilder()
            .bulkChangeTablets()
            .toApiString();
        return Axios.put(
            apiStr,
            tabletchanges,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createTablet(vehicleid, obj) {
        var apiStr = "";
        if (vehicleid) {
            apiStr = new ApiStringBuilder()
                .vehicles(vehicleid)
                .tablets()
                .toApiString();
        } else {
            apiStr = new ApiStringBuilder()
                .tablets()
                .toApiString();
        }
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        )
    }

    querySerialNo(query , page , size) {
        var apiStr = new ApiStringBuilder()
            .tablets()
            .search()
            .q_search("serialNumber", ":", query)
            .parameter("page", page || 0)
            .parameter("size", size || 5)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryVehicleLicensePlate(licensePlate , page , size) {
        var apiStr = new ApiStringBuilder()
            .tablets()
            .query()
            .vehicles(licensePlate)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryGSM(query , page , size) {
        var apiStr = new ApiStringBuilder()
            .tablets()
            .search()
            .q_search("gsm", ":", query)
            .parameter("page", page || 0)
            .parameter("size", size || 5)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createBulkTablets(obj) {
        var apiStr = new ApiStringBuilder()
            .vehicleTablets()
            .bulk()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        )
    }

    updateTablet(id, obj) {
        var apiStr = new ApiStringBuilder()
            .tablets(id)
            .toApiString();
        return Axios.put(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    deleteTablet(id) {
        var apiStr = new ApiStringBuilder()
            .tablets(id)
            .toApiString();
        return Axios.delete(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    deleteAllTablets() {
        var apiStr = new ApiStringBuilder()
            .tablets()
            .bulk()
            .toApiString();
        return Axios.delete(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }
}