import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class RouteConfigsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    deleteConfigItem(configid){
        var apiStr = new ApiStringBuilder()
            .routeConfigs(configid)
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