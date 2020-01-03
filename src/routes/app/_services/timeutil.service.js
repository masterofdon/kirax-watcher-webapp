export const timeservice = {
    convertToDate,
    convertToDateNoTime,
    convertISODateToDateNoTime,
    convertISODateToDate
}

function convertToDate(unix_timestamp , dateDelimeter) {
    var n = Number(unix_timestamp)
    var date = new Date(n);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    var dDelimeter = (dateDelimeter == null ? "-" : dateDelimeter);
    var day = date.getDate();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var formattedDate = day + dDelimeter + month + dDelimeter + year;
    return formattedDate + " " + formattedTime;
}

function convertToDateNoTime(unix_timestamp , dateDelimeter) {
    var n = Number(unix_timestamp)
    var date = new Date(n);

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    var dDelimeter = (dateDelimeter == null ? "-" : dateDelimeter);
    var day = date.getDate();
    var formattedDate = day + dDelimeter + month + dDelimeter + year;
    return formattedDate;
}

function convertISODateToDateNoTime(isodate , delimeter){
    var date = new Date(isodate);
    console.log(date.getTime());
    return convertToDateNoTime(date.getTime() , delimeter);
}

function convertISODateToDate(isodate , delimeter){
    var date = new Date(isodate);
    console.log(date.getTime());
    return convertToDate(date.getTime() , delimeter);
}