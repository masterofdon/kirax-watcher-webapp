import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SchoolsNetworkAdapter {
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

    getSchools(page, size) {
        var apiStr = new ApiStringBuilder().
            schools()
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

    getStudentsOfSchool(school , page, size) {
        var apiStr = new ApiStringBuilder().
            schools(school)
            .students()
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

    getSchoolContracts(schoolid , page , size){
        var apiStr = new ApiStringBuilder().
            contracts()
            schools(schoolid)
            .parameter("page", page || 0)
            .parameter("size", size || 1)
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

    querySchools(query) {
        var apiStr = new ApiStringBuilder()
            .schools()
            .search()
            .q_search("name", ":", query)
            .parameter("page" , 0)
            .parameter("size" , 5)
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

    getSchool(schoolid) {
        var apiStr = new ApiStringBuilder().
            schools(schoolid)
            .toString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
                
            }
        );
    }

    createSchool(schoolobj) {
        var apiStr = new ApiStringBuilder()
            .schools()
            .toApiString();
        return Axios.post(
            apiStr,
            schoolobj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        )
    }

    updateSchool(id, schoolobj) {
        var apiStr = new ApiStringBuilder()
            .schools(id)
            .toApiString();
        return Axios.put(
            apiStr,
            schoolobj,
            {
                headers: {
                    "Authorization": this.token
                }
                
            }
        );
    }

    deleteSchool(id) {
        var apiStr = new ApiStringBuilder()
            .schools(id)
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
}