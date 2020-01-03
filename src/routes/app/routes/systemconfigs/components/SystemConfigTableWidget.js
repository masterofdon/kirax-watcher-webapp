import React, { Component } from 'react';
import { Table, Row, Col, Menu, Dropdown, Icon, Divider, Input, Popconfirm, Spin, Button , Form } from 'antd';
import AppWidget from 'routes/app/components/AppWidget';
import R from '../config/R';
import { connect } from 'react-redux';
import SystemConfig from '../model/SystemConfig';
import S from 'routes/app/components/S';
import SystemConfigsNetworkAdapter from 'services/network/SystemConfigsNetworkAdapter';
import NewSystemConfigModal from './NewSystemConfigModal';

const WrapperNewSystemConfigModal = Form.create()(NewSystemConfigModal);

class SystemConfigTableWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: { position: 'bottom' },
            data: [],
            loading: false,
            changedObjects: [],
            newRow : null,
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleNewSystemConfigCreated = this.handleNewSystemConfigCreated.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
    }

    componentDidMount() {
        this.systemConfigApi = new SystemConfigsNetworkAdapter(this.props.user.user);
        this.fetch();
    }

    fetch(category, params = {}) {
        this.setState({ loading: true });
        if (category) {
            this.systemConfigApi.getSystemConfigsForCategory(category)
                .then(function (data) {
                    const pagination = { ...this.state.pagination };
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = data.data.totalElements;
                    this.setState({
                        loading: false,
                        data: data.data,
                        pagination,
                    });
                }.bind(this))
                .catch(function (data) {

                });
        } else {
            this.systemConfigApi.getAllSystemConfigs()
                .then(function (data) {
                    const pagination = { ...this.state.pagination };
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = data.data.totalElements;
                    this.setState({
                        loading: false,
                        data: data.data,
                        pagination,
                    });
                }.bind(this))
                .catch(function (data) {

                });
        }

    }

    fincObjectInChangedObjects(id) {
        for (var i = 0; i < this.state.changedObjects.length; i++) {
            if (this.state.changedObjects[i].id == id) {
                return this.state.changedObjects[i];
            }
        }
        return null;
    }

    handleAdd() {
        this.setState({modalVisible : true});
    }

    handleCancelModal(){
        this.setState({ modalVisible : false});
    }

    handleNewSystemConfigCreated(){
        this.fetch();
    }

    handleValueChange(val1, val2) {
        var newobj = this.fincObjectInChangedObjects(val1.id);
        if (newobj == null) {
            newobj = Object.assign({}, val1);
        }
        newobj.value = val2.currentTarget.value;
        this.state.changedObjects.push(newobj);
        this.setState({
            changedObjects: this.state.changedObjects
        });
    }

    handleTableChange() {

    }

    onDelete = (id) => {
        const data = [...this.state.data];
        this.systemConfigApi.deleteSystemConfig(id)
            .then(function (e) {
                this.fetch();
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            });
        // this.setState({ data: data.filter(item => item.id !== id) });
    }


    onRowSave(record) {
        var obj = this.fincObjectInChangedObjects(record.id);
        this.systemConfigApi.updateSystemConfig(obj.id, obj)
            .then(function (data) {
                console.log(data);
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            }.bind(this))
    }

    render() {
        const { data, pagination, loading } = this.state;
        const menu = (
            <Menu onClick={this.onMenuItemClicked}>
                <Menu.Item key={"TABLET"}><span style={{ marginLeft: '5px', padding: '5px' }}>{"TABLET"}</span></Menu.Item>
                <Menu.Item key={"SYSTEM"}><span style={{ marginLeft: '5px', padding: '5px' }}>{"SİSTEM"}</span></Menu.Item>
                <Menu.Item key={"USER"}><span style={{ marginLeft: '5px', padding: '5px' }}>{"KULLANICI"}</span></Menu.Item>
            </Menu>
        );
        const sysconfigcolumns = [{
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            width: 250
        }, {
            title: 'Birim',
            dataIndex: 'configkey',
            key: 'configkey',
            width: 450,

        }, {
            title: 'Değer',
            dataIndex: 'value',
            key: 'value',
            width: 450,
            render: function (text, record) {
                return (
                    <Input
                        defaultValue={text}
                        onChange={(value) => this.handleValueChange(record, value)}
                    />
                )
            }.bind(this)
        }, {
            title: 'Aksiyon',
            dataIndex: '',
            key: 'x',
            width: 200,
            render: function (text, record) {
                return (
                    <div>
                        <a onClick={() => this.onRowSave(record)}>Kaydet</a>
                        <Divider type={'vertical'} />
                        <Popconfirm title="Silmek İstediğinize Emin Misiniz?" onConfirm={() => this.onDelete.bind(this)(record.id)}>
                            <a>Sil</a>
                        </Popconfirm>

                    </div>

                );
            }.bind(this),
        }];
        return (
            <div>
                <AppWidget
                    headerText={"Sistem Ayarları Ekranı"}
                    headerSubText={''}
                    headerIcon={'header'}
                    bodyStyle={S.styles.widget.wigetbodystyle}
                >
                    <Row>
                        <Col>
                            <div style={{ marginLeft: '30px', marginTop: '20px' , marginBottom : '20px'}}>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" style={{ fontSize: '20px', padding: '10px' }} href="#">
                                        {this.props.category ? this.props.category : "---Kategori Seçiniz---"} <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Table
                        size={'large'}
                        columns={sysconfigcolumns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        locale={{ emptyText: "Veri Yok" }}
                        onChange={this.handleTableChange}
                    >

                    </Table>
                    <Row>
                        <Col offset={1} span={3}>
                            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }} block>
                                Satır Ekle
                            </Button>
                        </Col>
                    </Row>

                </AppWidget>
                <WrapperNewSystemConfigModal 
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancelModal}
                    onCreate={this.handleNewSystemConfigCreated}
                />
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

const connectedSystemConfigTableWidget = connect(mapStateToProps)(SystemConfigTableWidget);

export default connectedSystemConfigTableWidget;