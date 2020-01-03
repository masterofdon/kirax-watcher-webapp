import React, { Component } from 'react';
import { Row, Col , notification ,  Form} from 'antd';
import Dropzone from 'react-dropzone';
import AgencyTableWidget from './components/AgencyTableWidget';
import BulkAgencyAddWidget from './components/BulkAgencyAddWidget';
import R from './config/R';
import AgencyRegisterWidget from './components/AgencyRegisterWidget';
const WrappedRegistrationForm = Form.create()(AgencyRegisterWidget);

import { connect } from 'react-redux';
import AgenciesStatCard from './components/AgenciesStatCard';
import AgenciesNetworkAdapter from 'services/network/AgenciesNetworkAdapter';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }
        this.handleAgencyCreated = this.handleAgencyCreated.bind(this);
        this.fetchAgencyTable = this.fetchAgencyTable.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    }

    handleAgencyCreated(data){
        this.openNotificationWithIcon('success' , data.data.name + " başarılı bir şekilde eklendi.");
        this.fetchAgencyTable();
    }

    handleAgencyAdminCreated(data){
        this.openNotificationWithIcon('success' , data.data.name + " başarılı bir şekilde eklendi.");
    }

    fetchAgencyTable = (params = {}) => {
        this.setState({ loading: true });
        this.agencyAdapter.getAgencies(params.page - 1,10)
            .then((data) => {
                const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalElements;
                this.setState({
                    loading: false,
                    data: data.data.content,
                    pagination,
                });
            });
    }

    onDelete = (id) => {
        const data = [...this.state.data];
        this.agencyAdapter.deleteAgency(id)
        .then(function(e){
            this.fetchAgencyTable();
        }.bind(this))
        .catch(function(e){
            console.error(e);
        });
        // this.setState({ data: data.filter(item => item.id !== id) });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchAgencyTable({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    componentDidMount(){
        this.agencyAdapter = new AgenciesNetworkAdapter(this.props.user.user);
        this.fetchAgencyTable({page : 0, size : 10 });
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Tur Firması Ekleme İşlemi Başarılı',
            description: message,
            duration : 10
        });
    };
    
    render() {
        return (
            <div style={R.styles.divstyle}>
                <Row gutter={8} type="flex">
                    <Col span={5} order={1}>
                        <AgenciesStatCard 
                            iconstyle={R.styles.schoolBusIcon}
                            stattext={'Toplam Servis Sayısı'}
                            statvalue={'744'}
                        />
                    </Col>
                    <Col span={6} order={2}>
                        <AgenciesStatCard 
                            iconstyle={R.styles.routeIcon}
                            stattext={'Toplam Rota Sayısı'}
                            statvalue={'842'}
                        />
                    </Col>
                    <Col span={6} order={3}>
                        <AgenciesStatCard 
                            iconstyle={R.styles.studentMaleIcon}
                            stattext={'Bugün Taşınan Öğrenci Sayısı'}
                            statvalue={'4785'}
                        />
                    </Col>
                    <Col span={7} order={4}>
                        <AgenciesStatCard 
                            iconstyle={R.styles.notificationIcon}
                            stattext={'Bugün Yapılan Bildirim Sayısı'}
                            statvalue={'4677'}
                        />
                    </Col>
                </Row>
                <Row gutter={8} type="flex">
                    <Col style={R.styles.colStyle} span={17} order={2}>
                        <AgencyTableWidget 
                            data={this.state.data}
                            loading={this.state.loading}
                            pagination={this.state.pagination}
                            onDelete={this.onDelete}
                            handleTableChange={this.handleTableChange}
                        />
                    </Col>
                    <Col style={R.styles.colStyle} span={7} order={3}>
                        <WrappedRegistrationForm 
                            agencies={this.state.data}
                            handleAgencyCreated={this.handleAgencyCreated}
                            handleAgencyAdminCreated={this.handleAgencyAdminCreated}
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

const connectedAgenciesPage = connect(mapStateToProps)(index);

export default connectedAgenciesPage;