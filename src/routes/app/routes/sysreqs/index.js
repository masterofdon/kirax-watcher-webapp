import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    notification,
    Input,
    Button,
    Table,
    Menu,
    Tag,
    Dropdown,
    Icon
} from 'antd';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';

import { timeservice } from 'routes/app/_services/timeutil.service';
import BookingsNetworkAdapter from 'services/network/BookingsNetworkAdapter';

class SysreqsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingsdata: [],
            bookingspagiation: {
                current: 1,
                defaultCurrent: 1,
                pageSize: 10,
            },
            bookingsloading: false,
            bookingsToBeAdded: []
        }
    }

    componentDidMount() {
        this.bookingsApiAdapter = new BookingsNetworkAdapter(this.props.user.user);
        this.fetchBookingsData();
    }

    fetchBookingsData = () => {
        this.setState({
            bookingsloading: true
        })
        this.bookingsApiAdapter.getBookings(
            this.state.bookingspagiation.current - 1,
            this.state.bookingspagiation.pageSize)
            .then((res) => {
                this.setState({
                    bookingsdata: (res.data.content || []),
                    bookingsloading: false
                })
            })
            .catch((err) => {
                this.setState({
                    bookingsloading: false
                })
            });
    }

    handleBookingsTableChange = () => {

    }

    addNewBooking = () => {

    }

    onRegisterOK(requestid) {
        this.openNotificationWithIcon("success", requestid + " numarasıyla yeni bir sistem talebi oluşturuldu.");
        this.setState({
            modalvisible: false
        })
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Sistem Talebi',
            description: message,
            duration: 10
        });
    };

    render() {
        const { sysreq, refreshing } = this.state;

        const styles = {
            tagStyle: {
                padding: '8px',
                fontSize: '16px',
                fontWeight: '500'
            }
        }

        const bookingscolumn = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '7.5%',
            }, {
                title: 'TALEP AÇAN',
                dataIndex: 'inquiror',
                width: '10%',
                render: (value, item) => {
                    return (
                        value && <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value.username}
                        </Tag>
                    );
                }
            }, {
                title: 'ARAÇ',
                dataIndex: 'vehicle',
                width: '12.5%',
                render: (value, item) => {
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value.vehicle.id + " - " + value.vehicle.brand + " - " + value.vehicle.model}
                        </Tag>
                    );
                }
            }, {
                title: 'BAŞLANGIÇ TARİHİ',
                dataIndex: 'startdate',
                width: '10%',
                render: (value, item) => {
                    var ret = value.split("T")[0];
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {ret}
                        </Tag>
                    );
                }
            }, {
                title: 'BİTİŞ TARİHİ',
                dataIndex: 'enddate',
                width: '10%',
                render: (value, item) => {
                    if(value == undefined){
                        return;
                    }
                    var ret = value.split("T")[0];
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {ret}
                        </Tag>
                    );
                }
            }, {
                title: 'BAŞLANGIÇ KM',
                dataIndex: 'startkm',
                width: '10%',
                render: (value, item) => {
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value}
                        </Tag>
                    );
                }
            }, {
                title: 'BİTİŞ KM',
                dataIndex: 'endkm',
                width: '10%',
                render: (value, item) => {
                    if(value == undefined){
                        return;
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value}
                        </Tag>
                    );
                }
            }, {
                title: 'DURUM',
                dataIndex: 'state',
                width: '7.5%',
                render: (value, item) => {
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value}
                        </Tag>
                    );
                }
            }, {
                title: 'ONALAYAN',
                dataIndex: 'approver',
                width: '12.5%',
                render: (value, item) => {
                    if(value == undefined){
                        return;
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value.username}
                        </Tag>
                    );
                }
            }, {
                title: 'AKSİYON',
                dataIndex: '',
                width: '10%',
                render: (value, item) => {
                    const menu = (
                        <Menu onClick={(e) => {
                            if (e.key == "1") {
                                this.bookingsApiAdapter.verifiyBooking(item.id)
                                    .then((res) => {

                                    })
                                    .catch((err) => {

                                    })
                            } else if (e.key == "2") {
                                this.bookingsApiAdapter.rejectBooking(item.id)
                                    .then((res) => {

                                    })
                                    .catch((err) => {

                                    })
                            } else if (e.key == "3") {
                                this.bookingsApiAdapter.closeBooking(item.id)
                                    .then((res) => {

                                    })
                                    .catch((err) => {

                                    })
                            }
                        }}>
                            <Menu.Item key="1">
                                <Icon type="save" style={{
                                    fontSize: "16px",
                                }} />
                                <span style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: '8px'
                                }}>TALEBİ ONAYLA</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="delete" style={{
                                    color: "red"
                                }} />
                                <span style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: '8px',
                                    color: "red"
                                }}>TALEBİ REDDET</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="close-circle" style={{
                                }} />
                                <span style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: '8px'
                                }}>TALEBİ KAPAT</span>
                            </Menu.Item>
                            <Menu.Item key="4" disabled={true}>
                                <Icon type="save" style={{
                                    fontSize: "16px",
                                }} />
                                <span style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: '8px'
                                }}>NOT EKLE</span>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <span>
                            <Dropdown overlay={menu}>
                                <Button>
                                    SEÇENEKLER <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </span>
                    );
                }
            }
        ];

        return (
            <div>
                <Row>
                    <Col>
                        <AppWidget
                            headerText={'Kiralanabilir Envanter Tablosu'}
                            headerSubText={'Kiralanabilir Araçların Yönetim Tablosu'}
                            headerIcon={'schedule'}
                            headerStyle={{}}
                            bodyStyle={S.styles.widget.widgetbodystyle}
                            toolBoxOptions={'HEADER'}
                        >
                            <div style={{
                                margin: 16,
                            }}>
                                <Button
                                    icon={"plus-circle"}
                                    style={{
                                        margin: 16,
                                        height: 48,
                                        color: "#1890ff",
                                        backgroundColor: "white",
                                        fontWeight: '500',
                                        fontSize: '16px'
                                    }}
                                    onClick={this.addNewRentableVehicle}
                                >
                                    YENİ KAYIT EKLE
                                </Button>
                                <Input
                                    style={{
                                        margin: 16, height: 48, width: 400
                                    }}
                                    allowClear={true}
                                    onChange={function (e) {
                                        var query = e.target.value;
                                        if (query == '') {
                                            var currentaccountspagination = this.state.currentaccountspagination;
                                            currentaccountspagination.current = 1,
                                                currentaccountspagination.pageSize = 10;
                                            this.setState({
                                                query: undefined,
                                                currentaccountspagination
                                            })

                                            this.fetchCurrentAccountsForContract(
                                                this.props.user.user.contractid,
                                                currentaccountspagination.current,
                                                currentaccountspagination.pageSize
                                            );
                                            return;
                                        }
                                        var currentaccountspagination = this.state.currentaccountspagination;
                                        currentaccountspagination.current = 1;
                                        currentaccountspagination.pageSize = 10;
                                        this.setState({
                                            query,
                                            currentaccountsloading: true,
                                            currentaccountspagination
                                        })
                                        if (this.queryTimer != null) {
                                            clearTimeout(this.queryTimer)
                                            this.queryTimer = setTimeout(function (e) {
                                                this.contractNetworkApi.queryContractCurrentAccount(
                                                    this.props.user.user.contractid,
                                                    query,
                                                    this.state.currentaccountspagination.current - 1,
                                                    this.state.currentaccountspagination.pageSize)
                                                    .then((result) => {
                                                        this.queryTimer = null;
                                                        this.setState({
                                                            currentaccountsdata: result.data.content,
                                                            currentaccountspagination: {
                                                                ...this.state.currentaccountspagination,
                                                                total: result.data.totalElements
                                                            },
                                                            currentaccountsloading: false
                                                        })
                                                    })
                                                    .catch((err) => {
                                                        this.setState({
                                                            currentaccountsloading: false
                                                        })
                                                    })
                                            }.bind(this), 1500)
                                        } else {
                                            this.queryTimer = setTimeout(function (e) {
                                                this.contractNetworkApi.queryContractCurrentAccount(
                                                    this.props.user.user.contractid,
                                                    query,
                                                    0,
                                                    10)
                                                    .then((result) => {
                                                        this.setState({
                                                            currentaccountsdata: result.data.content,
                                                            currentaccountspagination: {
                                                                ...this.state.currentaccountspagination,
                                                                total: result.data.totalElements
                                                            },
                                                            currentaccountsloading: false
                                                        })
                                                        this.queryTimer = null;
                                                    })
                                                    .catch((err) => {
                                                        this.setState({
                                                            currentaccountsloading: false
                                                        })
                                                    })
                                            }.bind(this), 1500)
                                        }

                                    }.bind(this)}
                                ></Input>
                            </div>
                            <Table
                                columns={bookingscolumn}
                                dataSource={this.state.bookingsdata}
                                pagination={this.state.bookingspagiation}
                                loading={this.state.bookingsloading}
                                onChange={this.handleBookingsTableChange}
                                rowKey={(record) => {
                                    return record.id || record.index;
                                }}
                            >
                            </Table>
                        </AppWidget>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedSysreqsPage = connect(mapStateToProps)(SysreqsPage);

export default connectedSysreqsPage;