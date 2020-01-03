import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class VehicleSchedulesNetworkAdapter {
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

    getVehicleSchedules(page, size) {
        var apiStr = new ApiStringBuilder()
            .vehicles()
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

    getVehicleSchedule(id) {
        var apiStr = new ApiStringBuilder().
            vehicles(id)
            .toString();
        return Axios.get(apiStr);
    }

    createVehicleScheduleForRoute(routeid, obj) {
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .vehicleSchedules()
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

    createVSBulk(obj) {
        var apiStr = new ApiStringBuilder()
            .vehicleSchedules()
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
        )
    }

    updateVehicleSchedule(vsid , vehicleid) {
        var apiStr = new ApiStringBuilder()
            .vehicleSchedules(vsid)
            .vehicles(vehicleid)
            .toApiString();
        return Axios.put(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    deleteVehicleScheduleFromRoute(id) {
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
}