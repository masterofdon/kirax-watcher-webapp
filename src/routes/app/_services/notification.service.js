import { notification } from 'antd';

export const notservice = {
    openNotificationWithIcon
}

function openNotificationWithIcon(type, header, message){
    notification[type]({
        message: header,
        description: message,
        duration: 10
    });
}