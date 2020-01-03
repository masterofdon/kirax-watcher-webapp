import React, { Component } from 'react';
import { Row, Col, Table, List, Avatar, Menu, Dropdown, message, Icon, Spin, Select, Anchor, Input, Button } from 'antd';
import { connect } from 'react-redux';
import SystemRequestsNetworkAdapter from 'services/network/SystemRequestsNetworkAdapter';
import R from '../config/R';
import { timeservice } from 'routes/app/_services/timeutil.service';

const { Link } = Anchor;
const Option = Select.Option;

class SystemRequestTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            queues: [],
            selectedQueue: null,
            selectedStatus: null,
            pagination: { position: "top", pageSize: 5 },
            loading: false
        }
        this.itemRenderer = this.itemRenderer.bind(this);
        this.onMenuItemClicked = this.onMenuItemClicked.bind(this);
        this.findQueueItemById = this.findQueueItemById.bind(this);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleIDSearch = this.handleIDSearch.bind(this);
        this.handleIDSearchReset = this.handleIDSearchReset.bind(this);
    }

    componentDidMount() {
        this.systemRequestApi = new SystemRequestsNetworkAdapter(this.props.user.user);
        this.fetchMyRequests();
    }

    componentWillReceiveProps(props) {
    }

    fetchMyRequests = (params = {}) => {
        this.systemRequestApi.getMyRequests()
            .then((result) => {
                this.setState({
                    data: result.data,
                });
            })
            .catch((err) => {

            });
    }



    fetch = (queueid, params = {}) => {
        const status = this.state.selectedStatus;
        this.setState({ loading: true });
        var pro = this.systemRequestApi.getAllRequestsOnQueue(queueid, params.page - 1, params.results);
        if (status == "closed") {
            pro = this.systemRequestApi.getClosedRequestsOnQueue(queueid, params.page - 1, params.results);
        } else if (status == "wip") {
            pro = this.systemRequestApi.getWipRequestsOnQueue(queueid, params.page - 1, params.results);
        } else if (status == "open") {
            pro = this.systemRequestApi.getOpenRequestsOnQueue(queueid, params.page - 1, params.results);
        } else if (status == "fa") {
            pro = this.systemRequestApi.getFARequestsOnQueue(queueid, params.page - 1, params.results);
        } else {
            pro = this.systemRequestApi.getOpenRequestsOnQueue(queueid, params.page - 1, params.results);
        }

        pro.then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data.data.totalElements;
            this.setState({
                loading: false,
                data: data.data.content,
                pagination
            });
        });
    }

    handleOnItemClick(item) {
        this.props.onDetailsClicked(item);
    }

    handleStatusSelect(status) {
        this.state.selectedStatus = status;
        this.fetch(this.state.selectedQueue.id)
    }

    itemRenderer(item) {
        return (
            <List.Item style={{ padding: '20px' }}>
                <List.Item.Meta
                    title={
                        <div>

                            <Row>
                                <Col span={24}>
                                    <a 
                                        href="#system-request-details" 
                                        onClick={() => this.handleOnItemClick(item)}
                                        style={{
                                            display : 'flex',
                                            alignItems : 'center'
                                        }}>
                                        <Icon style={item.severity == "BC" ? R.styles.icons.severityBCIcon : (item.severity == "MAJOR" ? R.styles.icons.severityMajorIcon : R.styles.icons.severityMinorIcon)} />
                                        {item.id + "  " + item.title}
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{
                                    fontSize : '14px',
                                    fontWeight : '400',
                                    padding : '12px'
                                }}>
                                    {item.queue.name}
                                </Col>
                            </Row>
                        </div>

                    }

                    description={item.content.substr(0, 25) + "..."}
                />
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1 auto', fontSize: '14px', fontWeight: '600' }}>{item.createdBy}</div>
                    <div style={{ flex: '1 1 auto', fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>{timeservice.convertToDate(item.creationDate, '/')}</div>
                </div>
            </List.Item>);
    }

    onMenuItemClicked({ key }) {
        //message.info(`Click on item ${key}`);
        const item = this.findQueueItemById(key);
        this.state.selectedQueue = item;
        this.setState({
            selectedQueue: item
        });
        localStorage.setItem("lastQueue", JSON.stringify(this.state.selectedQueue));
        this.fetch(item.id);
    }

    findQueueItemById(key) {
        for (var i = 0; i < this.state.queues.length; i++) {
            if (this.state.queues[i].id == key) {
                return this.state.queues[i];
            }
        }
    }

    setSelectedKeys(value) {
        this.setState({
            searchID: value
        })
    }

    handleIDSearch() {
        if (this.state.searchID) {
            this.setState({ loading: true });
            this.systemRequestApi.queryByID(this.state.searchID, this.state.pagination.current - 1, this.state.pagination.pageSize)
                .then(function (data) {
                    const pagination = { ...this.state.pagination };
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = data.data.totalElements;
                    this.setState({
                        loading: false,
                        data: data.data.content,
                        pagination
                    })
                }.bind(this))
                .catch(function (error) {
                    this.setState({ loading: false });
                }.bind(this));
        }
    }

    handleIDSearchReset() {
        this.fetch(this.state.selectedQueue.id)
    }

    render() {
        const { data, queues } = this.state;
        data && data.sort((a, b) => {
            if (a.creationDate > b.creationDate) {
                return -1;
            } else if (a.creationDate < b.creationDate) {
                return 1;
            }
            return 0;
        })
        return (
            <div>
                <Row>
                    <Col span={5} offset={1}>
                        <div style={{
                            marginLeft: '30px',
                            marginTop: '20px',
                            fontSize: '20px',
                            padding: '10px'
                        }}>
                            <a className="ant-dropdown-link" style={{}} href="#">
                                {"---TALEPLERİM---"} <Icon type="down" />
                            </a>
                        </div>
                    </Col>
                    <Col span={3}>
                        <Select defaultValue="open" style={{ paddingTop: '20px', width: '200px' }} onSelect={this.handleStatusSelect}>
                            <Option value="open">Açık</Option>
                            <Option value="wip">Üstünde Çalışılanlar</Option>
                            <Option value="fa">Gelecekte Çözülecek</Option>
                            <Option value="closed">Kapalı</Option>
                            <Option value="all">Hepsi</Option>
                        </Select>

                    </Col>
                    <Col span={5}>
                        <Row style={{ paddingTop: '20px' }}>
                            <Col span={12}>
                                <Input
                                    ref={ele => this.licensePlateSearchInput = ele}
                                    value={this.state.searchID}
                                    placeholder="Sistem Talebi Ara"
                                    onChange={e => this.setSelectedKeys(e.target.value ? e.target.value : null)}
                                    onPressEnter={() => this.handleIDSearch(this.state.searchID)}
                                />
                            </Col>
                            <Col offset={1} span={4}><Button block type="primary" onClick={() => this.handleIDSearch(this.state.searchID)}>Ara</Button></Col>
                            <Col span={4}><Button block onClick={() => this.handleIDSearchReset()}>Sıfırla</Button></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <Col offset={1} span={22} style={{ paddingRight: '20px', border: '1px solid gray' }}>
                        <List
                            loading={this.state.loading}
                            itemLayout="vertical"
                            dataSource={data}
                            renderItem={this.itemRenderer}
                            locale={{ emptyText: <div style={{ fontSize: '20px', fontWeight: '600' }}>BOŞ LİSTE</div> }}
                            pagination={this.state.pagination}
                            column={4}
                            style={{ minHeight: '70vh' }}
                        />
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

const connectedSystemRequestTable = connect(mapStateToProps)(SystemRequestTable);

export default connectedSystemRequestTable;