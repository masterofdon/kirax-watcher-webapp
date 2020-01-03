import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class StudentsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    registerStudents(students){
        var apiStr = new ApiStringBuilder()
            .studentRegistration()
            .toApiString();
        return Axios.post(
            apiStr,
            students,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

}