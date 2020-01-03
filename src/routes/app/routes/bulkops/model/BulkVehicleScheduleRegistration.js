export default class BulkVehicleScheduleRegistration{
    constructor(contract , designator, routeName, direction, schedules){
        this.contract = contract;
        this.designator = designator;
        this.routeName = routeName;
        this.direction = direction;
        this.schedules = schedules;
    }
}