import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class StudentsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    changeStudentName(studentid, name) {
        var apiStr = new ApiStringBuilder()
            .students(studentid)
            .name(name)
            .toApiString();
        return Axios.put(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    queryStudentById(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .students()
            .search()
            .idquery(query)
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

    getStudents(page, size) {
        var apiStr = new ApiStringBuilder()
            .students()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getStudentsOfParent(parentid) {
        var apiStr = new ApiStringBuilder()
            .parents(parentid)
            .students()
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

    queryStudents(query, page, size) {
        var apiStr = new ApiStringBuilder().
            students()
            .search()
            .q_search("name", ":", query)
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

    getStudentsBySchool(schoolid, page, size, name) {
        var apiStr = new ApiStringBuilder()
            .schools(schoolid)
            .students()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .parameter("name", name)
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

    getStudent(id) {
        var apiStr = new ApiStringBuilder().
            students(id)
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

    createStudent(obj) {
        var apiStr = new ApiStringBuilder()
            .students()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        )
    }

    createBulkStudent(obj) {
        var apiStr = new ApiStringBuilder()
            .students()
            .bulk()
            .toApiString();
        return Axios.post(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        )
    }

    updateStudent(id, obj) {
        var apiStr = new ApiStringBuilder()
            .students(id)
            .toApiString();
        return Axios.put(
            apiStr,
            obj,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    updateStudentsMorningLocation(studentid , location){
        var apiStr = new ApiStringBuilder()
            .students(studentid)
            .locations("morning")
            .toApiString();
        return Axios.post(
            apiStr,
            location,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    updateStudentsEveningLocation(studentid , location){
        var apiStr = new ApiStringBuilder()
            .students(studentid)
            .locations("evening")
            .toApiString();
        return Axios.post(
            apiStr,
            location,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    updateNotifees(id, notifees) {
        var apiStr = new ApiStringBuilder()
            .students(id)
            .notifees()
            .toApiString();
        return Axios.put(
            apiStr,
            notifees,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    deleteStudentMorningLocation(studentid) {
        var apiStr = new ApiStringBuilder()
            .students(studentid)
            .locations("morning")
            .toApiString();
        var noneLocation = { lat: -1, lng: -1 };
        return Axios.post(
            apiStr,
            noneLocation,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    deleteStudentEveningLocation(studentid) {
        var apiStr = new ApiStringBuilder()
            .students(studentid)
            .locations("evening")
            .toApiString();
        var noneLocation = { lat: -1, lng: -1 };
        return Axios.post(
            apiStr,
            noneLocation,
            {
                headers: {
                    "Authorization": this.token
                }

            }
        );
    }

    deleteAllStudents() {
        var apiStr = new ApiStringBuilder()
            .students()
            .bulk()
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

    deleteStudent(id) {
        var apiStr = new ApiStringBuilder()
            .students(id)
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