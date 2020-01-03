import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class ParentsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getParents(page, size) {
        var apiStr = new ApiStringBuilder()
            .parents()
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

    queryParentByID(query, page, size) {
        var apiStr = new ApiStringBuilder().
            parents()
            .search()
            .q_search("id", ":", query)
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

    queryParents(query, page, size) {
        var apiStr = new ApiStringBuilder().
            parents()
            .search()
            .q_search("phoneNumber", ":", query)
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

    getParent(id) {
        var apiStr = new ApiStringBuilder().
            parents(id)
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

    createParent(obj) {
        var apiStr = new ApiStringBuilder()
            .parents()
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

    resetPassword(id) {
        var apiStr = new ApiStringBuilder()
            .oauth()
            .parents(id)
            .resetPassword()
            .toApiString();
        return Axios.patch(
            apiStr,
            {},
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    updateParent(id, obj) {
        var apiStr = new ApiStringBuilder()
            .parents(id)
            .toApiString();
        return Axios.put(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    deleteAllParents() {
        var apiStr = new ApiStringBuilder()
            .parents()
            .bulk()
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

    deleteParent(id) {
        var apiStr = new ApiStringBuilder()
            .parents(id)
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