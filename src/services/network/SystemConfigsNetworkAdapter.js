import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SystemConfigsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    createNewSystemConfig(sysconfig){
        var apiStr = new ApiStringBuilder()
            .sysconfigs()
            .toApiString();
        return Axios.post(
            apiStr,
            sysconfig,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    deleteSystemConfig(configid){
        var apiStr = new ApiStringBuilder()
            .sysconfigs()
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

    getAllSystemConfigs(page, size) {
        var apiStr = new ApiStringBuilder()
            .sysconfigs()
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

    getSystemConfigsForCategory(category) {
        var apiStr = new ApiStringBuilder()
            .sysconfigs()
            .categories(category)
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