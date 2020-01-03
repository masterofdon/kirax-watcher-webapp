const S = {

    styles: {
        iconstyle: {
            schoolIcon: {
                backgroundImage: 'url(../../../asset/images/icons/school_1.svg)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 0.65
            },
            schoolBusIcon: {
                backgroundImage: 'url(../../../asset/images/icons/school-bus.png)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            routeIcon: {
                backgroundImage: 'url(../../../asset/images/icons/route-icon-16.png)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 0.65
            },
            agencyIcon: {
                backgroundImage: 'url(../../../asset/images/icons/agency.png)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            assetsIcon: {
                backgroundImage: 'url(../../../asset/images/icons/assets.png)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            otherAssetsIcon: {
                backgroundImage: 'url(../../../asset/images/icons/magic-wand.png)',
                width: '16px',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            studentMaleIcon: {
                backgroundImage: 'url(../../../asset/images/icons/student-male-64.png)',
                width: '64px',
                height: '64px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            routeStatIcon: {
                backgroundImage: 'url(../../../asset/images/icons/route-64.png)',
                width: '64px',
                height: '64px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1
            },
            playIcon: {
                backgroundImage: 'url(../../../asset/images/icons/play_32.png)',
                width: '32px',
                height: '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                display: 'flex',
                justifyContent : 'center',
                padding : '8px',
                cursor: 'pointer',
            },
            pauseIcon: {
                backgroundImage: 'url(../../../asset/images/icons/pause_32.png)',
                width: '32px',
                height: '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                display: 'flex',
                justifyContent : 'center',
                padding : '8px',
                cursor: 'pointer',
            },
            stopIcon: {
                backgroundImage: 'url(../../../asset/images/icons/stop_32.png)',
                width: '32px',
                height: '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                display: 'flex',
                justifyContent : 'center',
                padding : '8px',
                cursor: 'pointer',
            },
        },
        layout: {
            divstyle: {
                minHeight: '100%',
                minWidth: '100%',
                marginTop: '10px'
            },
            colStyle: {
                marginTop: '10px'
            }
        },
        card: {
            cardbodystyle: {
                marginLeft : '4px',
                marginRight : '4px',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
            }
        },
        widget: {
            wigetbodystyle: {
                backgroundColor: 'rgba(255,255,255,1)',
                flex: 'auto'
            }
        },
        widgetBoxRowStyle: {
            marginTop: '10px',
            borderRadius: '5px',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
            padding: '0px 20px'
        }
    },
    errors: {
        atwec00001: {
            type: "ERROR",
            no: "atwec-00001",
            text: "No VehicleSchedule assigned to Route",
            tr_text: "Güzergaha henüz bir takvim atanmamış."
        },
        atwec00002: {
            type: "WARNING",
            no: "atwec-00002",
            text: "No Driver assigned to Vehicle",
            tr_text: "Araca atanmış bir şoför bulunamadı."
        },
        atwec00003: {
            type: "WARNING",
            no: "atwec-00003",
            text: "Vehicle Tablet is offline",
            tr_text: "Tablet çevirimdışı."
        },
        atwec00004: {
            type: "ERROR",
            no: "atwec-00004",
            text: "No Tablet User assigned to Vehicle Tablet",
            tr_text: "Tablet için Kullanıcı atanmamış."
        },
        atwec00005: {
            type: "ERROR",
            no: "atwec-00005",
            text: "Missing VehicleSchedule for day.",
            tr_text: "Eksik takvim."
        },
        atwec00006: {
            type: "ERROR",
            no: "atwec-00006",
            text: "No Vehicle assigned for VehicleSchedule for day.",
            tr_text: "Bugün için seçilen bir takvim yok."
        },
        atwec00007: {
            type: "ERROR",
            no: "atwec-00007",
            text: "No Tablet is matched for Vehicle.",
            tr_text: "Araca atanmış tablet bulunamadı."
        }
    },
    sysnots: {
        sysnot00001: {
            area: "EXTERNAL_ASSET",
            code: "sysnot00001",
            tr_text: "Rota vakti gelmesine ragmen henuz baslamadi."
        },
        sysnot00002: {
            area: "EXTERNAL_ASSET",
            code: "sysnot00001",
            tr_text: "Rota henüz oluşturulamadı."
        },
        sysnot00003: {
            area: "EXTERNAL_ASSET",
            code: "sysnot00001",
            tr_text: "Araçla eşleştirilmiş bir tablet bulunamadı."
        },
        sysnot00004: {
            area: "EXTERNAL_ASSET",
            code: "sysnot00001",
            tr_text: "Araç için belirlenmiş bir takvim bulunamadı."
        },
        atw00010: {
            area: "EXTERNAL_ASSET",
            code: "sysnot00001",
            tr_text: "Araç için belirlenmiş bir takvim bulunamadı."
        }
    }

};

export default S;