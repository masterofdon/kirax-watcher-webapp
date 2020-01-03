import React, { Component } from 'react';
import PlateIcon from 'routes/app/routes/routemgmt/components/PlateIcon';
import { Popover } from 'antd';

export default class SelectedPlatesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    popover(message) {
        return (
            <div>
                <p>Son Mesaj Saati : {message.lastMessage} </p>
                <p>Content</p>
            </div>
        )
    }

    onDoubleClick(item){
        console.log("On Double Clicked");
        console.log(item);
        this.props.onPlateDoubleClicked(item.lastLocation);
    }

    render() {
        const { vehicles } = this.props;
        const style = {
            onlineBoxStyle: {
                backgroundColor: '#1ca019',
                display: 'inline-block',
                padding: '10px',
                width: '200px',
                marginLeft: '15px',
                marginTop: '10px',
                border: '2px solid gray',
                borderRadius: '10px',
                boxShadow: 'inset 0 0 10px',
                cursor : 'pointer'
            },
            offlineBoxStyle: {
                backgroundColor: '#c53d3d',
                display: 'inline-block',
                padding: '10px',
                width: '200px',
                marginLeft: '15px',
                marginTop: '10px',
                border: '2px solid gray',
                borderRadius: '10px',
                boxShadow: 'inset 0 0 10px',
                cursor : 'pointer'
            }
        };

        const vehiclePlatesMap = vehicles.map(function (e) {
            const content = (
                <div>
                    <p><span style={{ fontSize : '14px' , fontWeight : '600'}}>Son Mesaj Saati</span> : {e.tablet && e.tablet.lastMessageTimestamp ? convertToDate(e.tablet.lastMessageTimestamp) : "N/A"}</p>
                    <p><span style={{ fontSize : '14px' , fontWeight : '600'}}>Durum</span> : {e.tablet && e.tablet.online ? 'Çevirim İçi' : 'Çevirim Dışı'}</p>
                </div>
            );
            return(
                <Popover key={e.id} placement="topRight" content={content} arrowPointAtCenter >
                    <div key={e.id} 
                         style={e.tablet && e.tablet.online ? style.onlineBoxStyle : style.offlineBoxStyle} 
                         onDoubleClick={this.onDoubleClick.bind(this , e)}>
                        <PlateIcon
                            plate={e.licensePlate}
                        />
                    </div>
                </Popover>
            )
        }.bind(this))
        return (
            <div style={{ padding: '20px' }}>
                {vehiclePlatesMap}
            </div>
        );
    }
}

function convertToDate(unix_timestamp) {
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

    var day = date.getDate();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var formattedDate = day + "-" + month + "-" + year;
    return formattedDate + " " + formattedTime;
}