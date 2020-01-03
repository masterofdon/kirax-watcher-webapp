import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class AgencyAdminsNetworkAdapter {
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

    getAgencyAdmins(callback) {
        var apiStr = new ApiStringBuilder().
            agencyadmins()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearing " + this.encoded
                }
            }
        );
    }

    getAgencyAdmin(agencyid) {
        var apiStr = new ApiStringBuilder().
        agencyadmins(agencyid)
            .toString();
        return Axios.get(apiStr);
    }

    createAgencyAdmin(agencyobj) {
        var apiStr = new ApiStringBuilder()
            .agencyadmins()
            .toApiString();
        return Axios.post(
            apiStr,
            agencyobj,
            {
                headers: {
                    "Authorization": "Bearing " + this.encoded
                }
                
            }
        )
    }

    updateAgencyAdmin(id,agencyobj){
        var apiStr = new ApiStringBuilder()
            .agencyadmins(id)
            .toApiString();
        return Axios.put(
                apiStr,
                agencyobj,
                {
                    headers: {
                        "Authorization": "Bearer " + this.encoded
                    }
                    
                }
        );
    }

    deleteAgencyAdmin(id){
        var apiStr = new ApiStringBuilder()
            .agencyadmins(id)
            .toApiString();
        return Axios.delete(
                apiStr,
                {
                    headers: {
                        "Authorization": "Bearer " + this.encoded
                    }
                    
                }
        );
    }
}