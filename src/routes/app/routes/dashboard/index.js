import { Button, Col, DatePicker, TimePicker, Dropdown, Icon, Input, Menu, Row, Select, Table, Tag } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import BookingsNetworkAdapter from 'services/network/BookingsNetworkAdapter';
import VehiclesAndInventoriesNetworkAdapter from 'services/network/VehiclesAndInventoriesNetworkAdapter';
import { timeservice } from '../../_services/timeutil.service'

const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentablesdata: [],
            bookingsdata: [],
            bookingspagiation: {
                current: 1,
                defaultCurrent: 1,
                pageSize: 10,
            },
            bookingsloading: false,
            bookingsToBeAddedIndex: 0,
            bookingToBeAdded: {},
            addingBooking: false
        }
    }

    componentDidMount() {
        this.bookingsApiAdapter = new BookingsNetworkAdapter(this.props.user.user);
        this.vehiclesAndInventoriesAdapter = new VehiclesAndInventoriesNetworkAdapter(this.props.user.user);
        this.fetchBookingsData();
        this.fetchRentableVehiclesData();
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

    fetchRentableVehiclesData = () => {
        this.setState({
            rentablesloading: true
        })
        this.vehiclesAndInventoriesAdapter.getRentableVehicles(0, 1000)
            .then((res) => {
                this.setState({
                    rentablesdata: (res.data.content || []),
                    rentablesloading: false
                })
            })
            .catch((err) => {
                this.setState({
                    rentablesloading: false
                })
            })
    }

    handleBookingsTableChange = () => {

    }

    addNewBooking = () => {
        var { bookingsdata, bookingsToBeAddedIndex } = this.state;
        console.log(Date.now());
        bookingsdata.push({
            index: bookingsToBeAddedIndex++,
            state: "INQUIRYSTARTED",
            entrydate: moment(Date.now()).format("YYYY-MM-DD"),
            inquiror: {
                id: this.props.user.user.uid,
                username: this.props.user.user.username
            }
        });
        this.setState({
            bookingsdata,
            bookingsToBeAddedIndex
        });
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

        const styles = {
            tagStyle: {
                padding: '8px',
                fontSize: '16px',
                fontWeight: '500'
            },
            newItemTagStyle: {
                padding: '8px',
                fontSize: '16px',
                fontWeight: '500',
                width: '250px'
            },
            newItemRowStyle: {
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center',
                display: "flex",
                margin: '8px 0px'
            }
        }

        const bookingscolumn = [
            {
                title: 'KAYIT TARİHİ',
                dataIndex: 'entrydate',
                width: '10%',
                render: (value, item) => {
                    if (value == undefined) {
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
                title: 'BAŞLANGIÇ',
                dataIndex: 'starttime',
                width: '7.5%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <TimePicker
                                onChange={(e) => {
                                    item.starttime = e.valueOf();
                                }}
                                size={"large"}
                                format={'HH:mm:ss'}
                            />
                        );
                    }
                    if (value == undefined) {
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
                title: 'BİTİŞ',
                dataIndex: 'endtime',
                width: '7.5%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <TimePicker
                                onChange={(e) => {
                                    item.endtime = e.valueOf();
                                }}
                                size={"large"}
                                format={'HH:mm:ss'}
                            />
                        );
                    }
                    if (value == undefined) {
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
                title: 'BAŞ. KM',
                dataIndex: 'startkm',
                width: '7.5%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <Input
                                onChange={(e) => {
                                    item.startkm = e.target.value;
                                    this.setState({})
                                }}
                                value={item.startkm}
                                size={"large"}
                            />
                        );
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value + " KM"}
                        </Tag>
                    );
                }
            }, {
                title: 'BİT. KM',
                dataIndex: 'endkm',
                width: '7.5%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <Input
                                onChange={(e) => {
                                    item.endkm = e.target.value;
                                    this.setState({})
                                }}
                                value={item.endkm}
                                size={"large"}
                            />
                        );
                    }
                    if (value == undefined) {
                        return;
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value + " KM"}
                        </Tag>
                    );
                }
            }, {
                title: 'SÜRÜCÜ ADI',
                dataIndex: 'drivername',
                width: '12.5%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <Input
                                onChange={(e) => {
                                    item.drivername = e.target.value;
                                    this.setState({})
                                }}
                                value={item.drivername}
                                size={"large"}
                            />
                        );
                    }
                    if (value == undefined) {
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
                title: 'YAKIT TUTAR',
                dataIndex: 'fuelamount',
                width: '10%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <Input
                                onChange={(e) => {
                                    item.fuelamount = e.target.value;
                                    this.setState({})
                                }}
                                value={item.fuelamount}
                                size={"large"}
                            />
                        );
                    }
                    if (value == undefined) {
                        return;
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value + " TL"}
                        </Tag>
                    );
                }
            }, {
                title: 'YAKIT LITRE',
                dataIndex: 'fuellitre',
                width: '10%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <Input
                                onChange={(e) => {
                                    item.fuellitre = e.target.value;
                                    this.setState({})
                                }}
                                value={item.fuellitre}
                                size={"large"}
                            />
                        );
                    }
                    if (value == undefined) {
                        return;
                    }
                    return (
                        <Tag
                            style={styles.tagStyle}
                            color="geekblue">
                            {value + " Lt."}
                        </Tag>
                    );
                }
            }, {
                title: 'MESAİ BAŞ.',
                dataIndex: 'extrahourfrom',
                width: '10%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <TimePicker
                                onChange={(e) => {
                                    item.extrahourfrom = e.valueOf();
                                }}
                                size={"large"}
                                format={'HH:mm:ss'}
                            />
                        );
                    }
                    if (value == undefined) {
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
                title: 'MESAİ BİT.',
                dataIndex: 'extrahourto',
                width: '10%',
                render: (value, item) => {
                    if (item.index != undefined) {
                        return (
                            <TimePicker
                                onChange={(e) => {
                                    item.extrahourto = e.valueOf();
                                }}
                                size={"large"}
                                format={'HH:mm:ss'}
                            />
                        );
                    }
                    if (value == undefined) {
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
                title: 'AKSİYON',
                dataIndex: '',
                width: '10%',
                render: (value, item) => {
                    const menu = (
                        <Menu onClick={(e) => {
                            if (e.key == "1") {
                                console.log(this.state.bookingToBeAdded);

                            } else if (e.key == "2") {
                            }
                        }}>
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
        const rentablesMap = (this.state.rentablesdata || []).map((e) => {
            return (
                <Select.Option key={e.id} value={e.id}>
                    {e.vehicle.brand + " - " + e.vehicle.model + " , " + e.vehicle.year}
                </Select.Option>
            )
        });
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
                                    style={this.state.addingBooking ? {
                                        margin: 16,
                                        height: 48,
                                        color: "white",
                                        backgroundColor: "gray",
                                        fontWeight: '500',
                                        fontSize: '16px'
                                    } : {
                                            margin: 16,
                                            height: 48,
                                            color: "#1890ff",
                                            backgroundColor: "white",
                                            fontWeight: '500',
                                            fontSize: '16px'
                                        }}
                                    onClick={(e) => {
                                        if (this.state.addingBooking) {
                                            this.setState({
                                                addingBooking: false
                                            })
                                        } else {
                                            this.setState({
                                                addingBooking: true
                                            })
                                        }
                                    }}
                                >
                                    {this.state.addingBooking ? "KAYIT EKLEME İPTAL" : "YENİ KAYIT EKLE"}
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
                            {this.state.addingBooking && <div>
                                <Row style={{
                                    padding: '16px',
                                }}>
                                    <Col span={10} offset={2}>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12} >
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    KAYIT TARİHİ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Tag
                                                    style={{
                                                        ...styles.newItemTagStyle,
                                                        width: '300px'
                                                    }}
                                                    color="geekblue">
                                                    {moment(Date.now()).format("YYYY-MM-DD")}
                                                </Tag>
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    ARAÇ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Select
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                    onSelect={(e) => {
                                                        this.state.bookingToBeAdded.vehicle = {
                                                            id: e
                                                        }
                                                        this.setState({})
                                                    }}>
                                                    {rentablesMap}
                                                </Select>
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    BAŞLANGIÇ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <TimePicker
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.starttime = e.valueOf();
                                                        this.setState({})
                                                    }}
                                                    size={"large"}
                                                    format={'HH:mm:ss'}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    BİTİŞ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <TimePicker
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.endtime = e.valueOf();
                                                        this.setState({})
                                                    }}
                                                    size={"large"}
                                                    format={'HH:mm:ss'}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    BAŞLANGIÇ KM :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Input
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.startkm = e.target.value;
                                                        this.setState({});
                                                    }}
                                                    value={this.state.bookingToBeAdded.startkm}
                                                    size={"large"}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    BİTİŞ KM :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Input
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.endkm = e.target.value;
                                                        this.setState({})
                                                    }}
                                                    value={this.state.bookingToBeAdded.endkm}
                                                    size={"large"}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col span={10} offset={1}>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    SÜRÜCÜ ADI :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Input
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.drivername = e.target.value;
                                                        this.setState({})
                                                    }}
                                                    value={this.state.bookingToBeAdded.drivername}
                                                    size={"large"}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    YAKIT TUTARI :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Input
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.fuelamount = e.target.value;
                                                        this.setState({})
                                                    }}
                                                    value={this.state.bookingToBeAdded.fuelamount}
                                                    size={"large"}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    YAKIT LİTRE :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <Input
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.fuellitre = e.target.value;
                                                        this.setState({})
                                                    }}
                                                    value={this.state.bookingToBeAdded.fuellitre}
                                                    size={"large"}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    MESAİ BAŞLANGIÇ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <TimePicker
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.extrahourfrom = e.valueOf();
                                                        this.setState({})
                                                    }}
                                                    size={"large"}
                                                    format={'HH:mm:ss'}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={styles.newItemRowStyle}>
                                            <Col span={12}>
                                                <Tag
                                                    style={styles.newItemTagStyle}
                                                    color="gray">
                                                    MESAİ BİTİŞ :
                                                </Tag>
                                            </Col>
                                            <Col span={12}>
                                                <TimePicker
                                                    onChange={(e) => {
                                                        this.state.bookingToBeAdded.extrahourto = e.valueOf();
                                                        this.setState({})
                                                    }}
                                                    size={"large"}
                                                    format={'HH:mm:ss'}
                                                    style={{
                                                        width: '300px'
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </div>}
                            {this.state.addingBooking && <div>
                                <Row>
                                    <Col span={6} offset={2}>
                                        <Button
                                            type={"primary"}
                                            icon={"save"}
                                            style={{
                                                margin: 16,
                                                height: 48,
                                                fontWeight: '500',
                                                fontSize: '16px',
                                                marginBottom : "16px"
                                            }}
                                            onClick={(e) => {
                                                this.bookingsApiAdapter.createBooking(this.state.bookingToBeAdded)
                                                    .then((res) => {
                                                        this.fetchBookingsData();
                                                        this.setState({
                                                            bookingToBeAdded : {}
                                                        })
                                                    })
                                                    .catch((err) => {

                                                    })
                                            }}
                                        >
                                            {"KAYDET"}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>}
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

const connectedDashboard = connect(mapStateToProps)(index);

export default connectedDashboard;