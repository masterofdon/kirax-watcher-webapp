
const isNull = r => (r == null || r === 'undefined');
const isNotNull = r => (!isNull(r));
const isEmpty = r => (r.length == 0);
export default class ApiStringBuilder {
    constructor(protocol , host, port){
        this.host = host || 'localhost'
        this.protocol = protocol || 'http';
        this.port = port || '3000';
        this.apiString = '/api';
        this.parameters = null;
    }

    actions(action){
        this.apiString += '/actions';
        if(isNotNull(action)){
            this.apiString += '/' + action;
        }
        return this;
    }

    agencies(agency){
        this.apiString += '/agencies';
        if(isNotNull(agency)){
            this.apiString += '/' + agency;
        }
        return this;
    }

    agencyadmins(admin){
        this.apiString += '/agenycadmins';
        if(isNotNull(admin)){
            this.apiString += '/' + admin;
        }
        return this;
    }

    agencyreps(agencyrep){
        this.apiString += '/agencyreps';
        if(isNotNull(agencyrep)){
            this.apiString += '/' + agencyrep;
        }
        return this;
    }

    agencyRepDocs(agencyrepdocid){
        this.apiString += '/agency-rep-docs';
        if(isNotNull(agencyrepdocid)){
            this.apiString += '/' + agencyrepdocid;
        }
        return this;
    }

    all(){
        this.apiString += '/_all';
        return this;
    }

    _all(){
        this.apiString += '/all';
        return this;
    }

    banks(bank){
        this.apiString += '/banks';
        if(isNotNull(bank)){
            this.apiString += '/' + bank;
        }
        return this;
    }

    bookings(booking){
        this.apiString += '/bookings';
        if(isNotNull(booking)){
            this.apiString += '/' + booking;
        }
        return this;
    }

    bulk(){
        this.apiString += '/bulk';
        return this;
    }

    bulkChangeTablets(){
        this.apiString += "/bulk-change-tablets";
        return this;
    }

    cameras(camera){
        this.apiString += '/cameras';
        if(isNotNull(camera)){
            this.apiString += '/' + camera;
        }
        return this;
    }

    currentAccounts(account){
        this.apiString += '/current-accounts';
        if(isNotNull(account)){
            this.apiString += '/' + account;
        }
        return this;
    }

    categories(category){
        this.apiString += '/categories';
        if(isNotNull(category)){
            this.apiString += '/' + category;
        }
        return this;
    }

    comments(comment){
        this.apiString += '/comments';
        if(isNotNull(comment)){
            this.apiString += '/' + comment;
        }
        return this;
    }

    contracts(contract){
        this.apiString += '/contracts';
        if(isNotNull(contract)){
            this.apiString += '/' + contract;
        }
        return this;
    }

    contractDistrictPricings(pricing){
        this.apiString += '/contract-district-pricings';
        if(isNotNull(pricing)){
            this.apiString += '/' + pricing;
        }
        return this;
        
    }

    contractDiscounts(discount){
        this.apiString += '/contract-discounts';
        if(isNotNull(discount)){
            this.apiString += '/' + discount;
        }
        return this;
    }

    desc(){
        this.parameters += ",desc";
        return this;
    }

    endpointResults(endpointid){
        this.apiString += '/endpoint-results';
        if(isNotNull(endpointid)){
            this.apiString += '/' + endpointid;
        }
        return this;
    }

    lastXHours(range){
        this.apiString += '/last-';
        if(isNotNull(range)){
            this.apiString += range;
        } else {
            this.apiString += 24;
        }
        return this;
    }

    districts(district){
        this.apiString += '/districts';
        if(isNotNull(district)){
            this.apiString += '/' + district;
        }
        return this;
    }

    drivers(driver){
        this.apiString += '/drivers';
        if(isNotNull(driver)){
            this.apiString += '/' + driver;
        }
        return this;
    }

    login(){
        this.apiString += '/login';
        return this;
    }

    logs(log){
        this.apiString += '/logs';
        if(isNotNull(log)){
            this.apiString += '/' + log;
        }
        return this;
    }

    locations(location){
        this.apiString += '/locations';
        if(isNotNull(location)){
            this.apiString += '/' + location;
        }
        return this;
    }

    lookup(){
        this.apiString += '/lookup';
        return this;
    }

    myRequests(){
        this.apiString += '/my-requests';
        return this;
    }

    notifees(){
        this.apiString += '/notifees';
        return this;
    }

    oauth(ops){
        this.apiString += "/oauth";
        if(isNotNull(ops)){
            this.apiString += '/' + ops;
        }
        return this;
    }

    parentNotification(){
        this.apiString += '/parent-notification';
        return this;
    }

    parameter(key,value){
        if(isNull(value)){
            return this;
        }
        if(isNull(this.parameters)){
            this.parameters = '?';            
        }else {
            this.parameters += '&';
        }
        this.parameters += key + '=' + value;
        return this;
    }

    historyItems(){
        this.apiString += '/history-items';
        return this;
    }

    origins(originid){
        this.apiString += '/origins';
        if(isNotNull(originid)){
            this.apiString += '/' + originid;
        }
        return this;
    }

    parents(parent){
        this.apiString += '/parents';
        if(isNotNull(parent)){
            this.apiString += '/' + parent;
        }
        return this;
    }

    name(name){
        this.apiString += '/name';
        if(isNotNull(name)){
            this.apiString += '/' + name;
        }
        return this;
    }

    payments(payment){
        this.apiString += '/payments';
        if(isNotNull(payment)){
            this.apiString += '/' + payment;
        }
        return this;
    }

    paymentsByDates(){
        this.apiString += '/payments-by-dates';
        return this;
    }

    _query(query){
        this.apiString += '/_query';
        if(isNotNull(query)){
            this.apiString += '/' + query;
        }
        return this;
    }

    query(query){
        this.apiString += '/query';
        if(isNotNull(query)){
            this.apiString += '/' + query;
        }
        return this;
    }

    idquery(query){
        this.apiString += '/idquery';
        if(isNotNull(query)){
            this.apiString += '/' + query;
        }
        return this;
    }

    unread(){
        this.apiString += '/unread';
        return this;
    }

    contractPricingPolicies(policy){
        this.apiString += '/contract-pricing-policies';
        if(isNotNull(policy)){
            this.apiString += '/' + policy;
        }
        return this;
    }

    pricingPolicies(policy){
        this.apiString += '/pricing-policies';
        if(isNotNull(policy)){
            this.apiString += '/' + policy;
        }
        return this;
    }
    
    requestQueues(queue){
        this.apiString += '/request-queues';
        if(isNotNull(queue)){
            this.apiString += '/' + queue;
        }
        return this;
    }
    
    routes(route){
        this.apiString += '/routes';
        if(isNotNull(route)){
            this.apiString += '/' + route;
        }
        return this;
    }

    schools(school){
        this.apiString += '/schools';
        if(isNotNull(school)){
            this.apiString += '/' + school;
        }
        return this;
    }

    search(search){
        this.apiString += '/_search';
        if(isNotNull(search)){
            this.apiString += '/' + search;
        }
        return this;
    }

    stats(stat){
        this.apiString += '/stats';
        if(isNotNull(stat)){
            this.apiString += '/' + stat;
        }
        return this;
    }

    state(state){
        this.apiString += '/state';
        if(isNotNull(state)){
            this.apiString += '/' + state;
        }
        return this;
    }

    studentRegistration(){
        this.apiString += "/student-registration";
        return this;
    }

    students(student){
        this.apiString += '/students';
        if(isNotNull(student)){
            this.apiString += '/' + student;
        }
        return this;
    }

    rentableVehicles(rentable){
        this.apiString += '/rentable-vehicles';
        if(isNotNull(rentable)){
            this.apiString += '/' + rentable;
        }
        return this;
    }

    sysconfigs(config){
        this.apiString += "/system-configs";
        if(isNotNull(config)){
            this.apiString += '/' + config;
        }
        return this;
    }

    sysreqs(request){
        this.apiString += '/system-requests';
        if(isNotNull(request)){
            this.apiString += '/' + request;
        }
        return this;
    }

    systemnotifications(systemnotification){
        this.apiString += '/system-notifications';
        if(isNotNull(systemnotification)){
            this.apiString += '/' + systemnotification;
        }
        return this;
    }

    systemadmins(userid){
        this.apiString += '/system-admins';
        if(isNotNull(userid)){
            this.apiString += '/' + userid;
        }
        return this;
    }
    
    tablets(tablet){
        this.apiString += '/tablets';
        if(isNotNull(tablet)){
            this.apiString += '/' + tablet;
        }
        return this;
    }

    unique(){
        this.apiString += '/unique';
        return this;
    }

    vehicleTablets(tablet){
        this.apiString += '/vehicle-tablets'
        if(isNotNull(tablet)){
            this.apiString += '/' + tablet;
        }
        return this; 
    }

    vehicles(vehicle){
        this.apiString += '/vehicles';
        if(isNotNull(vehicle)){
            this.apiString += '/' + vehicle;
        }
        return this;
    }

    vehicleSchedules(vehicleSchedule){
        this.apiString += '/vehicle-schedules';
        if(isNotNull(vehicleSchedule)){
            this.apiString += '/' + vehicleSchedule;
        }
        return this;
    }

    voyages(voyage){
        this.apiString += '/voyages';
        if(isNotNull(voyage)){
            this.apiString += '/' + voyage;
        }
        return this;
    }

    voyagelogs(voyage){
        this.apiString += '/voyage-logs/voyages';
        if(isNotNull(voyage)){
            this.apiString += '/' + voyage;
        }
        return this;
    }

    q_search(key , operator , value){
        this.parameter("q" , key + ":"  + value);
        return this;
    }

    toString(){
        return this.protocol + '://' + this.host + ':' + this.port + this.apiString;
    }

    toApiString(){
        return this.apiString + (this.parameters ? this.parameters : "");
    }

}