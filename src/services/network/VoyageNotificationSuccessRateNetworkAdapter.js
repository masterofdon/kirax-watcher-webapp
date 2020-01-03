import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class VoyageNotificationSuccessRateNetworkAdapter {

    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getSuccessRatesForDate(year , month , day){
        var apiStr = new ApiStringBuilder()
            .notificationSuccessRate()
            .year(year)
            .month(month)
            .day(day)
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

    getNotOpenedVoyages(year , month , day){
        var apiStr = new ApiStringBuilder()
            .notificationSuccessRate()
            .voyagesNotOpened()
            .year(year)
            .month(month)
            .day(day)
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

    getCommentsForNotificationSuccessRate(voyageid){
        var apiStr = new ApiStringBuilder()
            .notificationSuccessRate(voyageid)
            .comments()
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
    
    sendCommentToVoyageNotificationSuccessRate(voyageid , comment){
        var apiStr = new ApiStringBuilder()
            .notificationSuccessRate(voyageid)
            .comments()
            .toApiString();
        return Axios.post(
            apiStr,
            comment,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }
}