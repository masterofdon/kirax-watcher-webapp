import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class CamerasNetworkAdapter {
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

    getCameras(page,size) {
        var apiStr = new ApiStringBuilder()
            .cameras()
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

    getCamera(id) {
        var apiStr = new ApiStringBuilder().
            cameras(id)
            .toString();
        return Axios.get(apiStr);
    }

    createCamera(obj) {
        var apiStr = new ApiStringBuilder()
            .cameras()
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

    updateCamera(id,obj){
        var apiStr = new ApiStringBuilder()
            .cameras(id)
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

    deleteCamera(id){
        var apiStr = new ApiStringBuilder()
            .cameras(id)
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