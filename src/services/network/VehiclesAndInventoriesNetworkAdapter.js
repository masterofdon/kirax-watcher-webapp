import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class VehiclesAndInventoriesNetworkAdapter {
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

    getVehicles(page, size) {
        var apiStr = new ApiStringBuilder().
            vehicles()
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

    createVehicle(vehicle) {
        var apiStr = new ApiStringBuilder().
            vehicles()
            .toApiString();
        return Axios.post(
            apiStr,
            vehicle,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getRentableVehicles(page , size) {
        var apiStr = new ApiStringBuilder().
            rentableVehicles()
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

    createRentableVehicle(rentable) {
        var apiStr = new ApiStringBuilder().
            rentableVehicles()
            .toApiString();
        return Axios.post(
            apiStr,
            rentable,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    queryVehicle(query){
        var apiStr = new ApiStringBuilder().
            vehicles()
            .parameter("query" , query)
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
}