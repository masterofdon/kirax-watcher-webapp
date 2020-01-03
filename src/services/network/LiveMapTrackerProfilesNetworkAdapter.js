import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class LiveMapTrackerProfilesNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    getProfilesForUser(userid){
        var apiStr = new ApiStringBuilder()
            .users(userid)
            .liveMapTrackerProfiles()
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

    createLiveMapProfile(userid , profile) {
        var apiStr = new ApiStringBuilder()
            .users(userid)
            .liveMapTrackerProfiles()
            .toApiString();
        return Axios.post(
            apiStr,
            profile,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    
}