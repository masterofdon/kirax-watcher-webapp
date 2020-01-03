import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class OrganizationsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getOrganizations(page, size) {
        var apiStr = new ApiStringBuilder()
            .organizations()
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

    getOrganizationSchools(organizationid){
        var apiStr = new ApiStringBuilder()
            .organizations(organizationid)
            .schools()
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

}