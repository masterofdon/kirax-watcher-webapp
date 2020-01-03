const possibleColumnRegex = [
    /ad[\s-]*soyad/i,                                                                               // Name-Lastname of the student, either seperate or together
    /[öÖ][ğĞ]renc[iİ][a-z]*[\s]*tel[a-z]*/i,
    /[öÖ][ğĞ]renc[iİ][a-z]*[\s]*ema[a-z]*/i,                                                       // Email of the student, Not Required
    /[öÖ][ğĞ]renc[iİ][a-z]*[\s]*adres[a-zA-Z]*/i,                                                  // Address of the student, Not Required
    /[öÖ][ğĞ]renc[iİ][a-z]*[\s]*[a-z]*gps[a-z]*/i,                                                 // GPS location of the student, Not Required
    /[a-z]*vel[ıIiİ][\s]*1[\s]*ad[ıIiİ][\s]*(soyad)*[a-zıI]*/i,                                            // Name of parent-1, Not Required
    /[a-z]*vel[ıIiİ][\s]*1[\s]*tel[a-z\s]*/i,                                                       // Tel no of parent-1, Not Required
    /[a-z]*vel[ıIiİ][\s]*1[\s]*ema[iİ]l[a-zıI]*/i,
    /[a-z]*vel[ıIiİ][\s]*1[\s]*adres[iİ]*[a-zıI]*/i,
    /[a-z]*sabah[\s]*g[uüÜ]zer[a-z]*/i,                                                             // Default Assigned Route to the student, morning
    /[a-z]*ak[sşŞ]am[\s]*g[uüÜ]zer[a-z]*/i,                                                         // Default Assigned Route to the student, evening
    /[a-z]*vel[ıIiİ][\s]*2[\s]*ad[ıIiİ][\s]*(soyad)*[a-zıI]*/i,                                              // Name of parent-2, Not Required
    /[a-z]*vel[ıIiİ][\s]*2[\s]*tel[a-z\s]*/i,                                                       // Tel no of parent-2, Not Required
    /[a-z]*vel[ıIiİ][\s]*2[\s]*ema[iİ]l[a-zıI]*/i,
    /[a-z]*vel[ıIiİ][\s]*2[\s]*adres[iİ]*[a-zıI]*/i,
    /[a-z]*sabah[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*durumu[a-z]*/i,                                    // Notification status, morning, Not Required
    /[a-z]*sabah[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*uzakl[ıIiİ][gğĞ][ıIiİ][a-z]*/i,                    // Notification distance, morning, Not Required
    /[a-z]*sabah[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*yap[ıiIİ]lacak[\s]*k[iİıI][sşŞ][ıiİ][a-z]*/i,      // Notification distance, morning, Not Required
    /[a-z]*sabah[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*t[uüÜ]r[a-züÜ]*/i,                                 // Notification type, morning, Not Required
    /[a-z]*ak[sşŞ]am[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*durumu[a-z]*/i,                                // Notification status, evening, Not Required
    /[a-z]*ak[sşŞ]am[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*uzakl[ıIiİ][gğĞ][ıIiİ][a-z]*/i,                // Notification distance, evening, Not Required
    /[a-z]*ak[sşŞ]am[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*yap[ıiIİ]lacak[\s]*k[iİıI][sşŞ][ıiİ][a-z]*/i,          // Notification distance, morning, Not Required
    /[a-z]*ak[sşŞ]am[\s]*b[ıIiİ]ld[ıIiİ]r[ıIiİ]m[\s]*t[uüÜ]r[a-züÜ]*/i,                             // Notification type, evening, Not Required
    /[a-z]*[\s]*okul[\s]*[a-z]*/i                                                                   // School Enrolled
];

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var indexes = {};
var testArray = [
    'Ad-Soyad,Öğrenci Telefonu,Veli 1 Adı,Veli 1 Telefonu,Veli 1 Emaili',
    'ahmet mehmet,1,mehmet,1092',
    'veli ayse,2,veli,1019',
    'tevfik fatma,3,deli,1001'
]
const TABLECOLUMNS = [
    'Ad Soyad',
    'Öğrenci Telefonu',
    'Öğrenci Email',
    'Öğrenci Açık Adres',
    'Öğrenci GPS Konumu',
    'Veli 1 Ad Soyad',
    'Veli 1 Telefon',
    'Veli 1 Email',
    'Veli 1 Adresi',
    'Sabah Güzergahı',
    'Akşam Güzergahı',
    'Veli 2 Adı',
    'Veli 2 Telefonu',
    'Veli 2 Emaili',
    'Veli 2 Adresi',
    'Sabah Bildirim Durumu',
    'Sabah Bildirim Uzaklığı',
    'Sabah Bildirim Yapılacak Kişi',
    'Sabah Bildirim Türü',
    'Akşam Bildirim Durumu',
    'Akşam Bildirim Uzaklığı',
    'Akşam Bildirim Yapılacak Kişi',
    'Akşam Bildirim Türü',
    'Okul İsmi'
];

const TABLEINDEX = [
    'name',
    'studentPhone',
    'studentEmail',
    'studentAddress',
    'studentLocation',
    'parent1Name',
    'parent1Phone',
    'parent1Email',
    'parent1Address',
    'route0',
    'route1',
    'parent2Name',
    'parent2Phone',
    'parent2Email',
    'parent2Address',
    'route0NotificationStatus',
    'route0NotificationDistance',
    'route0Notifee',
    'route0NotificationType',
    'route0NotificationStatus',
    'route0NotificationDistance',
    'route0Notifee',
    'route0NotificationType',
    'school'
];


/*
    Given 'data', this method maps each TABLECOLUMNS entries real position in the data.
    Suppose we have a csv head as such:
        Ad Soyad;Öğrenci Telefonu;Veli 2 Adı;Öğrenci GPS Konumu
    As you have noticed, this does not contain all of our possible columns. Moreover, headers might not
    be sorted either. This method finds the index of the csv header and maps it to its corresponding
    TABLECOLUMNS array.
    The abovementioned csv table will give a result of the following array:
        > [0, 1, 11, 4]
*/
function getColumnMapping(data) {
    // This `data` is an array. First row should be column names.
    var columns = data[0];
    var columnsArray = columns.split(';');
    var arrLen = columnsArray.length;
    if (arrLen > 200)
        return -1;
    let i = 0;
    var resultArray = [];
    for (; i < arrLen; i++) {
        resultArray.push(matchInArray(columnsArray[i]));
    }
    return resultArray;
}
/*

*/
function matchInArray(str){
    for(var i = 0;i < possibleColumnRegex.length; i++)
    {
        var res = str.match(possibleColumnRegex[i]);
        if(res){
            return i;
        }
    }
}

/*
    Given a 'line'(string) and 'indexes'(array) 
*/
function createJSONObjectFromLine(line,indexes){
    var resultEntry = {};
    var lineArray = line.split(';');
    for(var i = 0;i < indexes.length;i++){
        resultEntry[TABLEINDEX[indexes[i]]] = lineArray[i];
    }
    return resultEntry;

}
/*
    Given a 'data'(array of lines) this method creates a JSON array of 
    table formatted JSON objects.
*/
function createJSONArrayFromCsvData(data){
    var resultArray = [];
    var indexes = getColumnMapping(data);
    for(var i = 1;i < data.length;i++){
        resultArray.push(createJSONObjectFromLine(data[i],indexes));
        resultArray[i - 1].key = i - 1;
    }
    return resultArray;
}

var CsvTableAdapter = {};
CsvTableAdapter.getColumnMapping = getColumnMapping;
CsvTableAdapter.createJSONArrayFromCsvData = createJSONArrayFromCsvData;
CsvTableAdapter.createJSONObjectFromLine = createJSONObjectFromLine;

export default CsvTableAdapter;