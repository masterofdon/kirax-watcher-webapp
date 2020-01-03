
class AuthService{
    constructor(){
        this.loggedIn = true;
        setTimeout(function(e) {
            this.loggedIn = false;
        }.bind(this),5000);
    }

    getLoggedInStatus(){
        return this.loggedIn;
    }

    setLoggedIn(loggedIn){
        this.loggedIn = loggedIn;
    }

    

}
if(!AuthService.instance){
    AuthService.instance = new AuthService();
}
export default AuthService;