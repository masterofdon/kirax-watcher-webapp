
export default class AuthUser {
    constructor(){
        this.username = null;
        this.phoneNumber = null;
        this.authToken = null;
        this.refreshToken = null;
        this.socialMedia = null;
        this.expires = null;
        this.userType = null;
    }

    getProfile(){
        return '/profiles/'+ this.userType + '/' + this.username 
    }

    getRefreshToken(){
        // TODO: 
    }

    getExpires(){
        return this.expires;
    }

    setExpires(expires){
        try{
            var exp = parseInt(expires);
            this.expires = exp;
        }catch(e){
            throw new Error("Failed to set new Expires Value : " + expires);   
        }
    }

}