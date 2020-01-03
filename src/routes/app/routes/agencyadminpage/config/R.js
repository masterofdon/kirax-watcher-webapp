const R = {
    styles: {
        containerStyle: {
            width: '100%'
        },
        rowStyle: {
            marginTop: '20px',
            borderRadius: '5px',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
        },
        borderlessRowStyle: {
            marginTop: '10px',
            marginBottom: '10px'
        },
        schoolIcon : {
            backgroundImage : 'url(../../../asset/images/icons/school_1.svg)',
            width: '32px',
            height : '32px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 0.65
        },
        vehicleIcon : {
            backgroundImage : 'url(../../../asset/images/icons/stat-card-bus-64.png)',
            width: '64px',
            height : '64px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 1
        },
        studentMaleIcon : {
            backgroundImage : 'url(../../../asset/images/icons/student-male-64.png)',
            width: '64px',
            height : '64px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 1
        },
        studentIcon : {
            backgroundImage : 'url(../../../asset/images/icons/stat-card-student-icon-64.png)',
            width: '64px',
            height : '64px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 1
        },
        routeIcon : {
            backgroundImage : 'url(../../../asset/images/icons/stat-card-route-icon-64.png)',
            width: '64px',
            height : '64px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 1
        },
        notificationIcon : {
            backgroundImage : 'url(../../../asset/images/icons/stat-card-notifications-icon-64.png)',
            width: '64px',
            height : '64px',
            backgroundRepeat: 'no-repeat',
            verticalAlign: 'text-top',
            opacity: 1
        },
    },
    tablet_layout: {
        vehicleSelector: [
            {
                title: 'Plaka',
                dataIndex: 'licensePlate',
                width: 400,
                key: 'licensePlate',
            },
        ]
    }
}

export default R;