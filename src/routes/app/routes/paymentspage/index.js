import React from 'react';
import {
    Row,
    Col,
    Button,
    Table,
    Input,
    DatePicker,
    Menu,
    Icon,
    Popconfirm,
    Dropdown,
    Modal,
    Collapse,
    Spin,
    Select,
    AutoComplete,
    Tag
} from 'antd';
import { connect } from 'react-redux';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import { notservice } from 'routes/app/_services/notification.service';
import ContractsNetworkAdapter from '../../../../services/network/ContractsNetworkAdapter';
import PaymentToBeMadeRow from './components/PaymentToBeMadeRow';
import _ from 'lodash';
import FullHistoryDetailsShowerModal from './components/FullHistoryDetailsShowerModal';
import VehiclesAndInventoriesNetworkAdapter from 'services/network/VehiclesAndInventoriesNetworkAdapter';

const MenuItem = Menu.Item;
const { RangePicker } = DatePicker;

const initialstate = {
    currentAccountsSelectedRowKeys: [],
    currentAccountsSelected: [],
    vehiclesdata: [],
    vehiclespagination: {
        current: 1,
        defaultCurrent: 1,
        pageSize: 10,
    },
    vehiclesloading: false,
    vehiclesToBeAddedIndex: 0,
    paymentstobemade: [],
    stats: {
        creditcashdist: [
            0, 0, 0
        ],
        creditcardbanks: [
        ],
        totalpayments: [
            0, 0
        ]
    },
    statpayments: [],
    inventoriesdata: [],
    inventoriespagination: {
        current: 1,
        defaultCurrent: 1,
        pageSize: 10
    },
    inventoriesloading: false,
    inventoriesToBeAddedIndex: 0,
    queryresult: [],
    datepaymentstotalsum: 0,
    datepaymentsloaded: false,
    fullhistoryitem: [],
    historyloading: false,
    currentaccountforhistory: undefined,
    modalpayment: undefined
}

class PaymentsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialstate
        }
        this.queryTimer = null;
    }

    componentDidMount() {
        this.vehiclesInventoryAdapter = new VehiclesAndInventoriesNetworkAdapter(this.props.user.user);
        this.fetcnVehiclesData();
        this.fetchRentableVehiclesData();
    }

    fetcnVehiclesData = () => {
        this.setState({
            vehiclesloading: true
        })
        this.vehiclesInventoryAdapter.getVehicles(
            this.state.vehiclespagination.current - 1,
            this.state.vehiclespagination.pageSize)
            .then((res) => {
                this.setState({
                    vehiclesdata: res.data.content,
                    vehiclesloading: false
                });
            })
            .catch((err) => {
                this.setState({
                    vehiclesloading: false
                })
            })
    }

    fetchRentableVehiclesData = () => {
        this.setState({
            inventoriesloading: true
        })
        this.vehiclesInventoryAdapter.getRentableVehicles(
            this.state.inventoriespagination.current - 1,
            this.state.inventoriespagination.pageSize)
            .then((res) => {
                this.setState({
                    inventoriesdata: res.data.content,
                    inventoriesloading: false
                });
            })
            .catch((err) => {
                this.setState({
                    inventoriesloading: false
                })
            })
    }

    handleVehicleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.currentaccountspagination };
        pager.current = pagination.current;
        this.setState({
            currentaccountspagination: pager,
        });
        if (this.state.query != undefined) {
            this.queryCurrentAccounts(pager.current, pagination.pageSize);
        } else {
            this.fetchCurrentAccountsForContract(this.props.user.user.contractid, pager.current, pagination.pageSize);
        }
    }

    handleInventoryTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.datepaymentspagination };
        pager.current = pagination.current;
        this.setState({
            datepaymentspagination: pager,
        });
    }

    onSelectChange = currentAccountsSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', currentAccountsSelectedRowKeys);
        this.setState({ currentAccountsSelectedRowKeys });
    };

    queryCurrentAccounts = (page, size) => {
        this.contractNetworkApi.queryContractCurrentAccount(
            this.props.user.user.contractid,
            this.state.query,
            page - 1,
            size)
            .then((result) => {
                this.setState({
                    currentaccountsdata: result.data.content,
                })
            })
            .catch((err) => {
                console.log("error during fetch");
            })
    }

    addNewVehicle = () => {
        var { vehiclesdata, vehiclesToBeAddedIndex } = this.state;
        vehiclesdata.push({
            index: vehiclesToBeAddedIndex++
        });
        this.setState({
            vehiclesdata,
            vehiclesToBeAddedIndex
        });
    }

    addNewRentableVehicle = () => {
        var { inventoriesdata, inventoriesToBeAddedIndex } = this.state;
        inventoriesdata.push({
            index: inventoriesToBeAddedIndex++
        });
        this.setState({
            inventoriesdata,
            inventoriesToBeAddedIndex
        });
    }

    saveVehicle = () => {

    }

    render() {
        const { modalpayment, currentaccountforhistory } = this.state;

        const vehiclescolumn = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '10%',
            }, {
                title: 'MARKA',
                dataIndex: 'brand',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.brand}
                            onChange={(e) => {
                                item.brand = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'SERİ',
                dataIndex: 'model',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.model}
                            onChange={(e) => {
                                item.model = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'YIL',
                dataIndex: 'year',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.year}
                            onChange={(e) => {
                                item.year = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'MOTOR',
                dataIndex: 'motorsize',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.motorsize}
                            onChange={(e) => {
                                item.motorsize = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'PLAKA',
                dataIndex: 'licenseplate',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.licenseplate}
                            onChange={(e) => {
                                item.licenseplate = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'RENK',
                dataIndex: 'color',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.color}
                            onChange={(e) => {
                                item.color = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'AKSİYON',
                dataIndex: '',
                width: '15%',
                render: (value, item) => {
                    const menu = (
                        <Menu onClick={(e) => {
                            console.log('click', e);
                            if (e.key == "1") {
                                console.log(item);
                                this.vehiclesInventoryAdapter.createVehicle(item)
                                    .then((res) => {
                                        this.fetcnVehiclesData();
                                    })
                                    .catch((err) => {

                                    })
                            } else if (e.key == "2") {
                                console.log("Geldi 2");
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
                                }}>KAYDET</span>
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
                                }}>SİL</span>
                            </Menu.Item>
                            <Menu.Item key="3" disabled={item.index != undefined}>
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

        const inventoriescolumn = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '10%',
            }, {
                title: 'KATEGORİ',
                dataIndex: 'category',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.category}
                            onChange={(e) => {
                                item.category = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'ARAÇ',
                dataIndex: 'vehicle',
                width: '15%',
                render: (value, item) => {
                    if (item.index == undefined) {
                        return (
                            <Tag
                                style={{
                                    padding : '12px',
                                    fontSize : '18px',
                                    fontWeight : '500'
                                }}
                                color="geekblue">
                                {value.id + " - " + value.brand + " - " + value.model}
                            </Tag>
                        );
                    }
                    const vehiclesDataMap = (this.state.vehiclesdata || []).map((e) => {
                        return <Select.Option key={e.id} value={e.id}>{e.brand + " - " + e.model}</Select.Option>
                    })
                    return (
                        <Select style={{ width: 300 }}
                            labelInValue
                            placeholder="Araç Seç..."
                            notFoundContent={this.state.vehiclesloading ? <Spin size="small" /> : null}
                            style={{ width: '100%' }}
                            onSelect={(e) => {
                                item.vehicle = {
                                    id: e.key
                                }
                                console.log(item);
                            }}
                        >
                            {vehiclesDataMap}
                        </Select>
                    );
                }
            }, {
                title: 'STOK',
                dataIndex: 'stockcount',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.stockcount}
                            onChange={(e) => {
                                item.stockcount = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'DURUM',
                dataIndex: 'status',
                width: '15%',
                render: (value, item) => {
                    return (
                        <Input
                            value={item.status}
                            onChange={(e) => {
                                item.status = e.target.value;
                                this.setState({});
                            }}
                        />
                    )
                }
            }, {
                title: 'AKSİYON',
                dataIndex: '',
                width: '15%',
                render: (value, item) => {
                    const menu = (
                        <Menu onClick={(e) => {
                            console.log('click', e);
                            if (e.key == "1") {
                                console.log(item);
                                this.vehiclesInventoryAdapter.createRentableVehicle(item)
                                    .then((res) => {
                                        this.fetchRentableVehiclesData();
                                    })
                                    .catch((err) => {

                                    })
                            } else if (e.key == "2") {
                                console.log("Geldi 2");
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
                                }}>KAYDET</span>
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
                                }}>SİL</span>
                            </Menu.Item>
                            <Menu.Item key="3" disabled={item.index != undefined}>
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
                            headerText={'Araç Yönetimi'}
                            headerSubText={'Tanımlı Araçlar Ekranı'}
                            headerIcon={'car'}
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
                                    onClick={this.addNewVehicle}>
                                    YENİ ARAÇ EKLE
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
                                columns={vehiclescolumn}
                                dataSource={this.state.vehiclesdata}
                                pagination={this.state.vehiclespagination}
                                loading={this.state.vehiclesloading}
                                onChange={this.handleVehicleTableChange}
                                rowKey={(record) => {
                                    return record.id || record.index;
                                }}
                                style={{
                                    padding: "12px"
                                }}
                            >
                            </Table>
                        </AppWidget>
                    </Col>
                </Row>
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
                                    YENİ ENVANTER EKLE
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
                                columns={inventoriescolumn}
                                dataSource={this.state.inventoriesdata}
                                pagination={this.state.inventoriespagination}
                                loading={this.state.inventoriesloading}
                                onChange={this.handleInventoryTableChange}
                                rowKey={(record) => {
                                    return record.id || record.index;
                                }}
                            >
                            </Table>
                        </AppWidget>
                    </Col>
                </Row>
                <FullHistoryDetailsShowerModal
                    currentaccount={currentaccountforhistory}
                    histories={this.state.fullhistoryitem}
                    visible={this.state.historyshow}
                    loading={this.state.historyloading}
                    onOKClicked={(e) => {
                        this.setState({
                            historyshow: false,
                            modalpayment: undefined
                        })
                    }}
                    onCancelClicked={(e) => {
                        this.setState({
                            historyshow: false,
                            modalpayment: undefined
                        })
                    }}
                    selectedpayment={modalpayment}
                    onPaymentSelected={(pid) => {
                        for (var i = 0; i < currentaccountforhistory.payments.length; i++) {
                            if (pid == currentaccountforhistory.payments[i].id) {
                                this.setState({
                                    modalpayment: currentaccountforhistory.payments[i]
                                })
                            }
                        }

                    }}
                />
            </div >
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedPaymentsPage = connect(mapStateToProps)(PaymentsPage);

export default connectedPaymentsPage;