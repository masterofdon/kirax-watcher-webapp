export default class Student {
    constructor(school , name , location , parent1 , parent2 , morningNotificationOps , eveningNotificationOps ){
        this.school = school;
        this.name = name;
        this.location = location;
        this.parent1 = parent1;
        this.parent2 = parent2;
        this.morningNotificationStatus = morningNotificationOps.status;
        this.morningNotificationType = morningNotificationOps.type;
        this.morningNotificationDistance = morningNotificationOps.distance;
        this.morningNotifee = morningNotificationOps.notifee;
        this.eveningNotificationStatus = eveningNotificationOps.status;
        this.eveningNotificationType = eveningNotificationOps.type;
        this.eveningNotificationDistance = eveningNotificationOps.distance;
        this.eveningNotifee = eveningNotificationOps.notifee;
    }
}