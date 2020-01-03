import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class RoutesNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    changeStudentsRoute(fromrouteid, torouteid, studentid) {
        var apiStr = new ApiStringBuilder()
            .routes(fromrouteid)
            .routes(torouteid)
            .students(studentid)
            .toApiString();
        return Axios.patch(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryByLicensePlate(licensePlate, page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .licensePlate(encodeURI(licensePlate))
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

    queryLive(page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .live()
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
    

    queryNotLive(page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .notLive()
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

    queryRouteByString(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .query(encodeURI(query))
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

    queryRouteByStringAndLive(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .query(encodeURI(query))
            .live()
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

    queryRouteByStringAndNotLive(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .query(encodeURI(query))
            .notLive()
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

    queryRouteById(query, page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .idquery(encodeURI(query))
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

    getAllRoutes() {
        var apiStr = new ApiStringBuilder()
            .routes("all")
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


    getRoutes(page, size) {
        var apiStr = new ApiStringBuilder()
            .routes()
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

    getRoutesForAgency(agencyid , page , size){
        var apiStr = new ApiStringBuilder()        
            .routes()
            .agencies(agencyid)
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

    getRoute(id) {
        var apiStr = new ApiStringBuilder().
            routes(id)
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

    getVoyagesForRoute(id, params) {
        var apiStr = new ApiStringBuilder()
            .routes(id)
            .voyages()
            .parameter("page", params.page || 0)
            .parameter("size", params.size || 10)
            .parameter("sort", "creationDate")
            .desc()
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

    searchTodayStartTime(routes){
        var apiStr = new ApiStringBuilder()
            .routes()
            .search()
            .todayStartTime()
            .toApiString();
        return Axios.patch(
            apiStr,
            routes,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createRoute(obj) {
        var apiStr = new ApiStringBuilder()
            .routes()
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

    createRoutesBulk(obj) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .bulk()
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

    createRouteForContract(id, obj) {
        var apiStr = new ApiStringBuilder()
            .contracts(id)
            .routes()
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

    createRouteConfigsForRoute(routeid, configList) {
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .routeConfigs()
            .bulk()
            .toApiString();
        return Axios.post(
            apiStr,
            configList,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        )
    }

    createRouteConfigForRoute(routeid, config) {
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .routeConfigs()
            .toApiString();
        return Axios.post(
            apiStr,
            config,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        )
    }

    createVoyageForRoute(routeid){
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .voyages()
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

    addStudentsToRoute(routeid, students) {
        var studentList = students.map((student) => {
            var studentObj = {};
            studentObj.id = student;
            return studentObj;
        });

        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .students()
            .toApiString();
        return Axios.post(
            apiStr,
            studentList,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        )
    }

    updateRoute(id, obj) {
        var apiStr = new ApiStringBuilder()
            .routes(id)
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

    updateRouteName(id, obj) {
        var apiStr = new ApiStringBuilder()
            .routes(id)
            .name()
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

    updateStudentsRouteOrder(routeid, studentwrappers) {
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .students()
            .toApiString();
        return Axios.put(
            apiStr,
            studentwrappers,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    deleteStudentFromRoute(routeid, studentid) {
        var apiStr = new ApiStringBuilder()
            .routes(routeid)
            .students(studentid)
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

    deleteRoute(id) {
        var apiStr = new ApiStringBuilder()
            .routes(id)
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

    deleteAllRoutes() {
        var apiStr = new ApiStringBuilder()
            .routes()
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

    deleteRoutesByContractId(contractid) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .bulk()
            .contracts(contractid)
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

    deleteRoutes(ids) {
        var apiStr = new ApiStringBuilder()
            .routes()
            .bulk()
            .toApiString();
        return Axios.delete(
            apiStr,
            ids,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }
}