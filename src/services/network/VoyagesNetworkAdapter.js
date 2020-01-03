import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class VoyagesNetworkAdapter {
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

    getVoyages(page,size) {
        var apiStr = new ApiStringBuilder()
            .voyages()
            .parameter("page",page || 0)
            .parameter("size",size || 10)
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

    getVoyageLogs(id , params){
        var apiStr = new ApiStringBuilder()
            .voyagelogs(id)
            .actions()
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

    getVoyagePath(id , params){
        var apiStr = new ApiStringBuilder()
            .voyagelogs(id)
            .locations()
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

    getVoyage(id) {
        var apiStr = new ApiStringBuilder().
            voyages(id)
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

    createVoyage(obj) {
        var apiStr = new ApiStringBuilder()
            .voyages()
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

    startVoyage(voyageid){
        var apiStr = new ApiStringBuilder()
            .voyages(voyageid)
            .start()
            .toApiString();
        return Axios.post(
            apiStr,
            {},
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
                
            }
        )
    }

    sendPath(vehicleid , log){
        var apiStr = new ApiStringBuilder()
            .entityLogs()
            .vehicles(vehicleid)
            .locations()
            .toApiString();
        return Axios.post(
            apiStr,
            log,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
                
            }
        )
    }

    updateVoyage(id,obj){
        var apiStr = new ApiStringBuilder()
            .voyages(id)
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

    deleteVoyage(id){
        var apiStr = new ApiStringBuilder()
            .voyages(id)
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