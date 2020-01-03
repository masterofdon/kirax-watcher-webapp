import Axios from 'axios';

const API_KEY = 'AIzaSyDyiDq8dONU3HE81arLWIHtMEChQeawVEQ';

export default class GoogleMapsAPI {


    snapToRoads(path){
        var pathQuery = "path=";
        for(var i = 0 ; i < path.length;i++){
            pathQuery += path[i].lat + "," + path[i].lng
            if(i != path.length -1){
                pathQuery += "|";
            }
        }
        console.log(pathQuery);
        var url = 'https://roads.googleapis.com/v1/snapToRoads?' + pathQuery + '&interpolate=true&key=' + API_KEY;
        return Axios.get(
            url,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

}