export default class BulkDriverRegistration{
    constructor(vehicle , name , phoneNumber){
        this.vehicle = vehicle;
        this.driver = {};
        this.driver.name = name;
        this.driver.phoneNumber = phoneNumber;
    }
}