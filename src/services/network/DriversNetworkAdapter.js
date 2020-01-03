import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class DriversNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    getDrivers(page, size) {
        var apiStr = new ApiStringBuilder()
            .voyages()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createBulkDrivers(obj) {
        var apiStr = new ApiStringBuilder()
            .drivers()
            .bulk()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryDriver(query , page , size ) {
        var apiStr = new ApiStringBuilder()
            .drivers()
            .search()
            .q_search("name", ":", query)
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryDriverByPhoneNumber(query , page , size){
        var apiStr = new ApiStringBuilder()
            .drivers()
            .search()
            .q_search("phoneNumber", ":", query)
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    updateDriver(id, obj) {
        var apiStr = new ApiStringBuilder()
            .drivers(id)
            .toApiString();
        return Axios.put(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }


}