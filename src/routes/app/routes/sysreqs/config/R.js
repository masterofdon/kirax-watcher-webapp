const R = {
    formItemLayout : {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
            lg : { span : 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            lg : { span : 18 }
        },
    },
    tailFormItemLayout : {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    },
    styles : {
        icons : {
            severityBCIcon : {
                backgroundImage : 'url(../../../asset/images/icons/warning_bc.png)',
                width: '32px',
                height : '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                marginRight : '10px'
            },
            severityMajorIcon : {
                backgroundImage : 'url(../../../asset/images/icons/warning_major.png)',
                width: '32px',
                height : '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                marginRight : '10px'
            },
            severityMinorIcon : {
                backgroundImage : 'url(../../../asset/images/icons/warning_minor.png)',
                width: '32px',
                height : '32px',
                backgroundRepeat: 'no-repeat',
                verticalAlign: 'text-top',
                opacity: 1,
                marginRight : '10px'
            },
        }
    }
}

export default R;