import { debug } from "util";

const R = {

    styles: {

    },
    tables: {
        studentsTable: [
            {
                title: 'Adı-Soyadı',
                dataIndex: 'fullname',
                key: 'a',
                width: 450,
            },
            {
                title: 'Okul Adı/Okul Kodu',
                dataIndex: '',
                key: 'b',
                width: 450
            },
            {
                title: 'Güzergah Tekrar Tipi',
                dataIndex: 'type',
                key: 'type',
                width: 350,
                render: (type) => type === "SINGULAR" ? "TEKİL" : "PERİYODİK"
            },
            {
                title: 'Güzergah Tipi',
                dataIndex: 'direction',
                key: 'direction',
                width: 350,
                render: (direction) => direction === "MORNING" ? "SABAH" : "AKSAM"
            },
            {
                title: 'Öğrenci Sayısı',
                dataIndex: 'students',
                key: 'students',
                width: 200,
                render: (students) => students == null ? 0 : students.length
            }, {
                title: 'Başlama Zamanı',
                dataIndex: 'plannedStartTime',
                key: 'plannedStartTime',
                width: 400,
            }, {
                title: 'Tahmini Bitiş Zamanı',
                dataIndex: 'plannedEndTime',
                key: 'plannedEndTime',
                width: 400,
            }
        ],
        routeTable: [
            {
                title: 'Kontrat Kodu',
                dataIndex: 'contract.id',
                width: '2%',
            },
            {
                title: 'Okul',
                dataIndex: 'school.id',
                width: '3%',
            },
            {
                title: 'Tur Firması',
                dataIndex: 'agency.id',
                width: '3%',
            },
            {
                title: 'Rota Belirteç',
                dataIndex: 'designator',
                width: '4%',
            },
            {
                title: 'Rota Adı',
                dataIndex: 'name',
                width: '4%',
            },
            {
                title: 'Öğrenci Ad-Soyad',
                dataIndex: 'student.name',
                width: '5%',
            }, 
            {
                title: 'Veli 1 Ad-Soyad',
                dataIndex: 'student.primary.name',
                width: '5%',
            },
            {
                title: 'Veli 1 Telefon',
                dataIndex: 'student.primary.phoneNumber',
                width: '4%',
            },
            {
                title: 'Veli 2 Ad-Soyad',
                dataIndex: 'student.secondary.name',
                width: '5%'
            },
            {
                title: 'Veli 2 Telefon',
                dataIndex: 'student.secondary.phoneNumber',
                width: '4%'
            },
            {
                title: 'Sabah Başlama Saati',
                dataIndex: 'morningPlannedStartTime',
                width: '5%',
            },
            {
                title: 'Sabah Bitiş Saati',
                dataIndex: 'morningPlannedEndTime',
                width: '5%',
            },
            {
                title: 'Akşam Başlama Saati',
                dataIndex: 'eveningPlannedStartTime',
                width: '5%',
            },
            {
                title: 'Akşam Bitiş Saati',
                dataIndex: 'eveningPlannedEndTime',
                width: '5%',
            },
        ],
        vehicleScheduleTable : [
            {
                title: 'Kontrat Kodu',
                dataIndex: 'contract.id',
                width: '3%',
            },
            {
                title: 'Rota Belirteç',
                dataIndex: 'designator',
                width: '3%',
            },
            {
                title: 'Rota Adı',
                dataIndex: 'routeName',
                width: '3%',
            },
            {
                title: 'Rota Tipi',
                dataIndex: 'direction',
                width: '3%',
            },
            {
                title: 'Pazartesi',
                dataIndex: 'schedules.0.vehicle.licensePlate',
                width: '4%',
            },
            {
                title: 'Salı',
                dataIndex: 'schedules.1.vehicle.licensePlate',
                width: '4%',
            },
            {
                title: 'Çarşamba',
                dataIndex: 'schedules.2.vehicle.licensePlate',
                width: '4%',
            },
            {
                title: 'Perşembe',
                dataIndex: 'schedules.3.vehicle.licensePlate',
                width: '4%',
            },
            {
                title: 'Cuma',
                dataIndex: 'schedules.4.vehicle.licensePlate',
                width: '4%',
            }
        ],
        tabletsTable : [
            {
                title: 'Araç Plaka',
                dataIndex: 'vehicle.licensePlate',
                width: '3%',
            },
            {
                title: 'Tablet Modeli',
                dataIndex: 'tablet.model',
                width: '3%',
            },
            {
                title: 'Tablet Seri No',
                dataIndex: 'tablet.serialNumber',
                width: '3%',
            },
            {
                title: 'Tablet IMEI',
                dataIndex: 'tablet.imei',
                width: '3%',
            },
        ],
        driversTable : [
            {
                title: 'Araç Plaka',
                dataIndex: 'vehicle.licensePlate',
                width: '20%',
            },
            {
                title: 'Şoför Ad-Soyad',
                dataIndex: 'driver.name',
                width: '40%',
            },
            {
                title: 'Şoför Ad-Soyad',
                dataIndex: 'driver.phoneNumber',
                width: '30%',
            }
        ],
        tabletChangeTable : [
            {
                title: 'Eski Serial',
                dataIndex: 'prevSerial',
                width: '40%',
            },
            {
                title: 'Yeni Serial',
                dataIndex: 'nextSerial',
                width: '40%',
            },
        ]
    },
    defOptions : {
        addStudent  : {
            selectedOption: "student",
            selectedOptionHeader: "Öğrenci Ekleme Tablosu",
            selectedOptionSubHeader: "Öğrenci eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addParent : {
            selectedOption: "parent",
            selectedOptionHeader: "Veli Ekleme Tablosu",
            selectedOptionSubHeader: "Veli eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addVehicle : {
            selectedOption: "vehicle",
            selectedOptionHeader: "Araç Ekleme Tablosu",
            selectedOptionSubHeader: "Araç eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addTablet : {
            selectedOption: "tablet",
            selectedOptionHeader: "Tablet Ekleme Tablosu",
            selectedOptionSubHeader: "Tablet eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addRoute : {
            selectedOption: "route",
            selectedOptionHeader: "Güzergah Ekleme Tablosu",
            selectedOptionSubHeader: "Güzergah eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addVehicleSchedule : {
            selectedOption: "vehicleschedule",
            selectedOptionHeader: "Araç Takvimi Ekleme Tablosu",
            selectedOptionSubHeader: "Araç Takvimi eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        addDriver : {
            selectedOption: "driver",
            selectedOptionHeader: "Şoför Ekleme Tablosu",
            selectedOptionSubHeader: "Şoför eklemek için tabloyu doldurun veya excel dosyası seçin.",
            opType : "bulkadd"
        },
        removeRoute : {
            selectedOption: "removeroute",
            selectedOptionHeader: "Güzergah Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removeroute"
        },
        removeSchool : {
            selectedOption: "removeschool",
            selectedOptionHeader: "Okul Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removeschool"
        },
        removeStudent : {
            selectedOption: "removestudent",
            selectedOptionHeader: "Öğrenci Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removestudent"
        },
        removeParent : {
            selectedOption: "removeparent",
            selectedOptionHeader: "Öğrenci Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removeparent"
        },
        removeContract : {
            selectedOption: "removecontract",
            selectedOptionHeader: "Sözleşme Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removecontract"
        },
        removeVehicle : {
            selectedOption: "removevehicle",
            selectedOptionHeader: "Araç Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removevehicle"
        },
        removeTablet : {
            selectedOption: "removetablet",
            selectedOptionHeader: "Tablet Silme Aracı",
            selectedOptionSubHeader: "",
            opType : "removetablet"
        },
        changeTablet : {
            selectedOption: "changetablet",
            selectedOptionHeader: "Tablet Değiştirme Aracı",
            selectedOptionSubHeader: "",
            opType : "changetablet"
        }
    }
}

export default R;