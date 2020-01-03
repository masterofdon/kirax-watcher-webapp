import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class StatsNetworkAdapter {
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

    getTotalNumberOfRoutes() {
        var apiStr = new ApiStringBuilder()
            .stats()
            .routes(0)
            .parameter("lang", "TR")
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getNumberOfActiveVehicles() {
        var apiStr = new ApiStringBuilder()
            .stats()
            .vehicles(0)
            .parameter("lang", "TR")
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getTodaysCompletedVoyages() {
        var apiStr = new ApiStringBuilder()
            .stats()
            .voyages(0)
            .parameter("lang", "TR")
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getTotalStudents(agencyid) {
        var apiStr = new ApiStringBuilder()
            .stats()
            .agencies(agencyid)
            .students()
            .parameter("lang", "TR")
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