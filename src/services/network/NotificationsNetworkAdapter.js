import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class NotificationsNetworkAdapter {
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

    sendNotificationGET() {
        var nReq = {};
        nReq.type = "GEOFENCE_IN_MORNING_ARRIVAL";
        nReq.target = {};
        nReq.target.targetID = "YdiY82EP9I";
        nReq.target.type = "PARENT";
        var apiStr = new ApiStringBuilder()
            .parentNotification()
            .toApiString();
        console.log("GETAPI: " + apiStr);
        return Axios.post(
            apiStr,
            nReq,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    sendNotificationPOST(targetid , voyageid , vehicleid) {
        var nReq = {};
        nReq.type = "GEOFENCE_IN_MORNING_ARRIVAL";
        nReq.target = {};
        nReq.target.partyID = targetid;
        nReq.target.type = "PARENT";
        nReq.source = {};
        nReq.source.partyID = vehicleid;
        var apiStr = new ApiStringBuilder()
            .parentNotification()
            .voyages(voyageid)
            .morningArrive()
            .toApiString();
        return Axios.post(
            apiStr,
            nReq,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    sendSchoolArriveNotificationPOST(voyageid , vehicleid) {
        var nReq = {};
        nReq.type = "GEOFENCE_IN_MORNING_ARRIVAL";
        nReq.target = {};
        nReq.target.partyID = voyageid;
        nReq.target.type = "VOYAGE";
        nReq.source = {};
        nReq.source.partyID = vehicleid;
        var apiStr = new ApiStringBuilder()
            .parentNotification()
            .voyages(voyageid)
            .morningScholArrive()
            .toApiString();
        return Axios.post(
            apiStr,
            nReq,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }


    sendNotificationActionLog(targetid , voyageid , name) {
        var nReq = {};
        nReq.type = "NOTIFICATION";
        nReq.payload = {};
        nReq.payload.action = "MORNING_STUDENT_ARRIVE_TABLET_NOTIFICATION_REQUEST";
        nReq.payload.target = {};
        nReq.payload.target.name = name;
        nReq.payload.target.partyID = targetid; 
        var apiStr = new ApiStringBuilder()
            .voyagelogs(voyageid)
            .actions()
            .toApiString();
        return Axios.post(
            apiStr,
            nReq,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    sendSchoolArriveActionLog(targetid , voyageid , vehicleid) {
        var nReq = {};
        nReq.type = "NOTIFICATION";
        nReq.payload = {};
        nReq.payload.action = "MORNING_SCHOOL_ARRIVE_TABLET_NOTIFICATION_REQUEST";
        nReq.payload.takenBy = {};
        nReq.payload.takenBy.partyID = vehicleid;
        nReq.payload.target = {};
        nReq.payload.target.partyID = voyageid; 
        var apiStr = new ApiStringBuilder()
            .voyageLogs(voyageid)
            .actions()
            .toApiString();
        return Axios.post(
            apiStr,
            nReq,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }
    
}