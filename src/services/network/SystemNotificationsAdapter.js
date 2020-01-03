import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class SystemNotificationsAdapter {
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

    getSystemNotifications(options) {
        var apiStr = new ApiStringBuilder()
            .systemadmins(options.uid)
            .systemnotifications()
            .parameter("page", options.page || 0)
            .parameter("size", options.size || 10)
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

    getUnreadSystemNotifications(options) {
        var apiStr = new ApiStringBuilder()
            .systemadmins(options.uid)
            .systemnotifications()
            .unread()
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

    markSystemNotificationAsRead(){

    }

    markSystemNotificationAsRead(){
        
    }

    deleteSystemNotification(id) {
        var apiStr = new ApiStringBuilder()
            .systemnotifications(id)
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