import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SchoolsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    sendSMSToTargetRoleAndWhereIn(obj){
        var apiStr = new ApiStringBuilder().
            smsnot()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization" : this.token
                }
            }
        );
    }

}