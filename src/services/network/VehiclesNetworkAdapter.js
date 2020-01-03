import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class VehiclesNetworkAdapter {
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
        var apiStr = new ApiStringBuilder()
            .vehicles()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
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

    getAllVehicles() {
        var apiStr = new ApiStringBuilder()
            .vehicles("all")
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

    getVehicle(id) {
        var apiStr = new ApiStringBuilder().
            vehicles(id)
            .toString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createVehicle(obj) {
        var apiStr = new ApiStringBuilder()
            .vehicles()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        )
    }

    createVehicleForAgency(agencyid, obj) {
        var apiStr = new ApiStringBuilder()
            .agencies(agencyid)
            .vehicles()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        )
    }

    queryVehiclesByLicensePlateInAgency(agencyid , query, params) {
        var apiStr = new ApiStringBuilder()
            .agencies(agencyid)
            .vehicles(query)
            .parameter("page", params.page || 0)
            .parameter("size", params.size || 5)
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

    queryVehiclesByLicensePlate(query, params) {
        var apiStr = new ApiStringBuilder()
            .vehicles()
            .search()
            .q_search("licensePlate", ":", query)
            .parameter("page", params.page || 0)
            .parameter("size", params.size || 10)
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

    lookupVehicleRoutes(vehicleId) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .lookup()
            .vehicles(vehicleId)
            .unique()
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

    updateVehicle(id, obj) {
        var apiStr = new ApiStringBuilder()
            .vehicles(id)
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

    deleteVehicle(id) {
        var apiStr = new ApiStringBuilder()
            .vehicles(id)
            .toApiString();
        return Axios.delete(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    deleteAllVehicles() {
        var apiStr = new ApiStringBuilder()
            .vehicles()
            .bulk()
            .toApiString();
        return Axios.delete(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }
}