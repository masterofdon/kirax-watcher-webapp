import React, { Component } from 'react';
import { Row, Col, Slider, Icon, Button, DatePicker } from 'antd';
import moment from 'moment';
import CalendarLocale from 'rc-calendar/lib/locale/tr_TR';
import S from 'routes/app/components/S';

export default class LiveMapWatchRouteSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeSumMinimized: false,
        }
        this.handleToogleMinimize = this.handleToogleMinimize.bind(this);
        this.tooglePlayPause = this.tooglePlayPause.bind(this);
        this.onStopClicked = this.onStopClicked.bind(this);
        this.onDatePickerSelected = this.onDatePickerSelected.bind(this);
    }

    onDatePickerSelected(date, dateString) {
        console.log(date, dateString);
        this.props.onDateSelected(dateString);
    }

    handleToogleMinimize() {
        if (this.state.routeSumMinimized) {
            this.setState({
                routeSumMinimized: false,
            });
        }
        else {
            this.setState({
                routeSumMinimized: true
            })
        }
    }

    handleChange = (value) => {
        this.props.onSliderValueChanged(value);
    }

    onStopClicked() {
        if (this.props.playing) {
            this.props.onStopClicked();
        }
    }

    tooglePlayPause() {
        if (this.props.playing) {
            this.props.onPause();
        } else {
            this.setState({ playing: true })
            this.props.onPlay();
        }
    }

    calculateDistance(lat1, lat2, lon1, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    render() {
        const { currentPath, speedmap, playing, busspeed, voyage, live, max, value } = this.props;
        const { routeSumMinimized } = this.state;

        var dist = 0;
        var totalSpeed = 0;
        var avgspeed = 0;
        var currentspeed = 0;
        var speedAvailable = false;
        if (currentPath && currentPath.length > 0) {
            for (var i = 0; i < currentPath.length - 1; i++) {
                dist += this.calculateDistance(currentPath[i].lat, currentPath[i + 1].lat, currentPath[i].lng, currentPath[i + 1].lng);

            }
            dist = (Math.round(dist * 100) / 100) + " km"
        }
        if (speedmap && speedmap.length > 0) {
            for (var x = 0; x < speedmap.length; x++) {
                totalSpeed += speedmap[x]
            }
            avgspeed = totalSpeed / speedmap.length;
            avgspeed = (Math.round(avgspeed * 100) / 100) + " km/s"
        }
        if (dist == 0) {
            dist = null;
        }
        if (avgspeed == 0) {
            avgspeed = null;
        }

        if (live || playing) {
            speedAvailable = true;
        }

        if (busspeed) {
            currentspeed = Math.floor(busspeed) + " km/s";
        }

        const style = {
            headerStyle: {
                padding: '10px',
                backgroundColor: '#ffffff',
                margin: '5px',
                borderRadius: '10px',
                position: 'absolute',
                zIndex: '1000',
                minWidth: '80%',
                border: '3px solid gray'
            },
            minimizedHeaderStyle() {
                return {
                    height: '50px',
                    ...this.headerStyle
                }

            }
        }
        const locale = {
            lang: {
                placeholder: 'Tarih Seç',
                rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
                ...CalendarLocale,
            }
        };
        const dateFormat = 'DD/MM/YYYY';
        return (
            <div>
                <Row style={routeSumMinimized ? style.minimizedHeaderStyle() : style.headerStyle}>
                    <Col span={5}>
                        {!routeSumMinimized && <span style={{ fontSize: '16px', fontWeight: '500' }}>Katedilen Mesafe: {dist && <h2>{dist}</h2>}</span>}
                    </Col>
                    <Col span={4}>
                        {routeSumMinimized && <h2>Rota Özeti</h2>}
                        {!routeSumMinimized && <span style={{ fontSize: '16px', fontWeight: '500' }}>Ortalama Hız : {avgspeed && <h2>{avgspeed}</h2>}</span>}
                    </Col>
                    <Col span={3}>
                        {!routeSumMinimized && <span style={{ fontSize: '16px', fontWeight: '500' }}>Başlama: <h4>{voyage && convertTimestamp(voyage.actualStartTime)}</h4></span>}
                        {!routeSumMinimized && <span style={{ fontSize: '16px', fontWeight: '500' }}>Bitiş : <h4>{voyage && convertTimestamp(voyage.actualEndTime)}</h4></span>}
                    </Col>
                    <Col span={3}>
                        {speedAvailable && !routeSumMinimized && <span style={{ fontSize: '16px', fontWeight: '400' }}>Anlık Hız : <h2>{currentspeed}</h2></span>}
                    </Col>
                    <Col span={1}>
                        {routeSumMinimized ?
                            <Icon onClick={this.handleToogleMinimize} style={{ cursor: 'pointer', fontSize: '24px' }} type="down-circle" />
                            :
                            <Icon onClick={this.handleToogleMinimize} style={{ cursor: 'pointer', fontSize: '24px' }} type="up-circle" />
                        }
                    </Col>
                    <Col span={8}>
                        <div style={{ height: '130px' }}>
                            <Row>
                                <Col span={24} style={{ padding: '10px' }}>
                                    {<DatePicker style={{ width: '100%', fontSize: '18px' }}
                                        onChange={this.onDatePickerSelected}
                                        placeholder={"Tarih Seçiniz..."}
                                        locale={locale}
                                        defaultValue={moment()}
                                        format={dateFormat}
                                    />}
                                </Col>
                            </Row>
                            <Row style={{ margin: ' 10px' }}>
                                <Col offset={1} span={2}>
                                    <Button onClick={this.tooglePlayPause} shape="circle">
                                        <Icon style={playing ? S.styles.iconstyle.pauseIcon : S.styles.iconstyle.playIcon} />
                                    </Button>
                                </Col>
                                <Col span={18} >
                                    <Slider {...this.props} min={0} max={max} onChange={this.handleChange} value={value} />
                                </Col>
                                <Col span={2}>
                                    <Icon onClick={this.onStopClicked} style={S.styles.iconstyle.stopIcon} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3}>
                                    <h2>Saat: </h2>
                                </Col>
                                <Col span={10}>
                                    <h4>{this.props.time}</h4>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function convertTimestamp(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month < 10 ){
        month = "0" + month;
    }
    var day = date.getDate();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    var result = day + "/" + month + "/" + year + " " + formattedTime;
    return result;

    
}