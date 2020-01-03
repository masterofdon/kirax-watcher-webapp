import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SavedSMSContentNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getAllSavedSMS(){
        var apiStr = new ApiStringBuilder()
            .savedSMS()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization" : this.token
                }
            }
        );
    }

    createSavedSMSContent(obj){
        var apiStr = new ApiStringBuilder()
            .savedSMS()
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

    deleteSavedSMSContent(id){
        var apiStr = new ApiStringBuilder()
            .savedSMS(id)
            .toApiString();
        return Axios.delete(
            apiStr,
            {
                headers: {
                    "Authorization" : this.token
                }
            }
        );
    }

}