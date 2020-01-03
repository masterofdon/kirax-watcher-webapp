export default class BulkRouteRegistration{
    constructor(contract , school , agency , designator , name , student , times){
        this.contract = contract;
        this.school = school;
        this.agency = agency;
        this.designator = designator;
        this.name = name;
        this.student = student;
        this.morningPlannedStartTime = times.morningST;
        this.morningPlannedEndTime = times.morningET;
        this.eveningPlannedStartTime = times.eveningST;
        this.eveningPlannedEndTime = times.eveningET;
    }

}