import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class AgenciesNetworkAdapter {
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

    getAgencies(page, size) {
        var apiStr = new ApiStringBuilder().
            agencies()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
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

    queryAgencies(query, params) {
        var apiStr = new ApiStringBuilder()
            .agencies()
            .search()
            .q_search("name", ":", query)
            .parameter("page", params.page || 0)
            .parameter("size", params.size || 5)
            .toApiString()
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization" : this.token
                }
            }
        );
    }

    getAgency(agencyid) {
        var apiStr = new ApiStringBuilder().
            agencies(agencyid)
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

    getAgencySummary(agencyid) {
        var apiStr = new ApiStringBuilder().
            agencies(agencyid)
            .summary()
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

    createAgency(agencyobj) {
        var apiStr = new ApiStringBuilder()
            .agencies()
            .toApiString();
        return Axios.post(
            apiStr,
            agencyobj,
            {
                headers: {
                    "Authorization" : this.token
                }

            }
        )
    }

    createAgencyAndAdmin(agencyobj) {
        var apiStr = new ApiStringBuilder()
            .agencies()
            .toApiString();
        return Axios.post(
            apiStr,
            agencyobj,
            {
                headers: {
                    "Authorization" : this.token
                }

            }
        )
    }

    addContractToAgency(agencyid, contract) {
        var apiStr = new ApiStringBuilder()
            .agencies(agencyid)
            .contracts()
            .toApiString();
        return Axios.post(
            apiStr,
            contract,
            {
                headers: {
                    "Authorization" : this.token
                }

            }
        )
    }

    updateAgency(id, agencyobj) {
        var apiStr = new ApiStringBuilder()
            .agencies(id)
            .toApiString();
        return Axios.put(
            apiStr,
            agencyobj,
            {
                headers: {
                    "Authorization" : this.token
                }
                
            }
        );
    }

    deleteAgency(id) {
        var apiStr = new ApiStringBuilder()
            .agencies(id)
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