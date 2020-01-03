import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class EndpointResultsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    get24HoursServerErrors(endpointid) {
        var apiStr = new ApiStringBuilder()
            .endpointResults(endpointid)
            .lastXHours(96)
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

    getLastWeeksServerErrors() {
        var apiStr = new ApiStringBuilder()
            .endpointResults(168)
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