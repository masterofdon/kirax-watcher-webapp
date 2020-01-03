export default class DateConverter {
    
    
    static convertTStoDate(ts){
        var date = new Date(ts);

        var year = date.getFullYear();
        var month = date.getMonth()  + 1;
        var day = date.getDate();
        return day + "/" + month + "/" + year;
    }

    static convertTStoYear(ts){
        var date = new Date(ts);

        return date.getFullYear();
    }

    static convertTStoMonthYear(ts){
        var date = new Date(ts);

        return (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}