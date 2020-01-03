import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SystemRequestsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getAllAvailableQueues() {
        var apiStr = new ApiStringBuilder()
            .requestQueues()
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

    getAllRequestsOnQueue(queue, page, size) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queue)
            .sysreqs()
            .parameter("page", page || 0)
            .parameter("size", size || 100)
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

    getClosedRequestsOnQueue(queue, page, size) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queue)
            .sysreqs("closed")
            .parameter("page", page || 0)
            .parameter("size", size || 100)
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

    getOpenRequestsOnQueue(queue, page, size) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queue)
            .sysreqs("open")
            .parameter("page", page || 0)
            .parameter("size", size || 100)
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

    getWipRequestsOnQueue(queue, page, size) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queue)
            .sysreqs("wip")
            .parameter("page", page || 0)
            .parameter("size", size || 100)
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

    getFARequestsOnQueue(queue, page, size) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queue)
            .sysreqs("fa")
            .parameter("page", page || 0)
            .parameter("size", size || 100)
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

    getRequestDetails(requestid, page, size) {
        var apiStr = new ApiStringBuilder()
            .sysreqs(requestid)
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

    getMyRequests() {
        var apiStr = new ApiStringBuilder()
            .sysreqs()
            .myRequests()
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

    getVisibleQueues(){
        var apiStr = new ApiStringBuilder()
            .requestQueues()
            ._all()
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

    createRequestQueue(queue) {
        var apiStr = new ApiStringBuilder()
            .requestQueues()
            .toApiString();
        return Axios.post(
            apiStr,
            queue,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    createRequestForQueue(queueid, request) {
        var apiStr = new ApiStringBuilder()
            .requestQueues(queueid)
            .sysreqs()
            .toApiString();
        return Axios.post(
            apiStr,
            request,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    updateRequest(requestid, request) {
        var apiStr = new ApiStringBuilder()
            .sysreqs(requestid)
            .toApiString();
        return Axios.put(
            apiStr,
            request,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    deleteRequest(requestid) {
        var apiStr = new ApiStringBuilder()
            .sysreqs(requestid)
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

    sendCommentForRequest(requestid, comment) {
        var apiStr = new ApiStringBuilder()
            .sysreqs(requestid)
            .comments()
            .toApiString();
        return Axios.post(
            apiStr,
            comment,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    queryByID(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .sysreqs()
            .query(query)
            .parameter("page", page || 0)
            .parameter("size", size || 5)
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