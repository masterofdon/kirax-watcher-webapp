import React, { Component } from 'react';
import { Row, Col, Radio, Button } from 'antd';
import StudentsNetworkAdapter from 'services/network/StudentsNetworkAdapter';
import TabletsNetworkAdapter from 'services/network/TabletsNetworkAdapter';
import VehiclesNetworkAdapter from 'services/network/VehiclesNetworkAdapter';
import DriversNetworkAdapter from 'services/network/DriversNetworkAdapter';
import RoutesNetworkAdapter from 'services/network/RoutesNetworkAdapter';
import ParentsNetworkAdapter from 'services/network/ParentsNetworkAdapter';
import BulkOpsTypeSelectionRadioGroup from './components/BulkOpsTypeSelectionRadioGroup';
import BulkRouteRemoveRadioGroup from './components/BulkRouteRemoveRadioGroup';
import BulkVehicleRemoveRadioGroup from './components/BulkVehicleRemoveRadioGroup';
import BulkStudentsRemoveRadioGroup from './components/BulkStudentsRemoveRadioGroup';
import BulkParentsRemoveRadioGroup from './components/BulkParentsRemoveRadioGroup';
import BulkTabletsRemoveRadioGroup from './components/BulkTabletsRemoveRadioGroup';

import AppWidget from 'routes/app/components/AppWidget';
import BulkOperationsTable from './components/BulkOperationsTable';
import BulkOpsDropArea from './components/BulkOpsDropArea';
import VehicleSchedulesNetworkAdapter from 'services/network/VehicleSchedulesNetworkAdapter';
import { notservice } from 'routes/app/_services/notification.service';
import { connect } from 'react-redux';

import R from './config/R';

const OPTYPE = [
    'bulkadd',
    'removeroute'
];

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedOptionHeader: null,
            selectedOptionSubHeader: null,
            dataList: null,
            loading: false,
            opType: null,
        }
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onDataProcess = this.onDataProcess.bind(this);
        this.onSendClicked = this.onSendClicked.bind(this);
    }

    componentDidMount() {
        var userItem = this.props.user.user;
        this.studentsApi = new StudentsNetworkAdapter(userItem);
        this.routesApi = new RoutesNetworkAdapter(userItem);
        this.vehicleScheduleApi = new VehicleSchedulesNetworkAdapter(userItem);
        this.tabletApi = new TabletsNetworkAdapter(userItem);
        this.driverApi = new DriversNetworkAdapter(userItem);
        this.vehicleApi = new VehiclesNetworkAdapter(userItem);
        this.parentsApi = new ParentsNetworkAdapter(userItem);
    }

    onSelectionChanged(selection) {
        this.setState({
            selectedOption: null,
            selectedOptionHeader: null,
            selectedOptionSubHeader: null,
            dataList: null,
            loading: false,
        });
        setTimeout(this.changeSelectedOption.bind(this, selection), 500);
    }

    renderOpTypeArea() {
        switch (this.state.opType) {
            case "bulkadd":
                return (<BulkOpsDropArea
                    dataType={this.state.selectedOption}
                    onDataProcessed={this.onDataProcess}
                />);
            case "removeroute":
                return (
                    <BulkRouteRemoveRadioGroup
                        loading={this.state.loading}
                        onValueChanged={this.onRouteRemoveOptionSelected.bind(this)}
                    />
                );
            case "removevehicle":
                return (
                    <BulkVehicleRemoveRadioGroup
                        loading={this.state.loading}
                        onValueChanged={this.onRouteRemoveOptionSelected.bind(this)}
                    />
                );
            case "removestudent":
                return (
                    <BulkStudentsRemoveRadioGroup
                        loading={this.state.loading}
                        onValueChanged={this.onRouteRemoveOptionSelected.bind(this)}
                    />
                );
            case "removeparent":
                return (
                    <BulkParentsRemoveRadioGroup
                        loading={this.state.loading}
                        onValueChanged={this.onRouteRemoveOptionSelected.bind(this)}
                    />
                );
            case "removetablet":
                return (
                    <BulkTabletsRemoveRadioGroup
                        loading={this.state.loading}
                        onValueChanged={this.onRouteRemoveOptionSelected.bind(this)}
                    />
                );
            case "changetablet":
                return (<BulkOpsDropArea
                    dataType={this.state.selectedOption}
                    onDataProcessed={this.onDataProcess}
                />);
            default:
                return null;
        }
    }

    onRouteRemoveOptionSelected() {
        this.onSendClicked()
    }

    changeSelectedOption(selection) {
        switch (selection) {
            case "a":
                var defOptions = R.defOptions.addStudent;
                if (this.state.selectedOption !== 'student') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "b":
                var defOptions = R.defOptions.addParent;
                if (this.state.selectedOption !== 'parent') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "c":
                var defOptions = R.defOptions.addVehicle;
                if (this.state.selectedOption !== 'vehicle') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "d":
                var defOptions = R.defOptions.addTablet;
                if (this.state.selectedOption !== 'tablet') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "e":
                var defOptions = R.defOptions.addRoute;
                if (this.state.selectedOption !== 'route') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "f":
                var defOptions = R.defOptions.addVehicleSchedule;
                if (this.state.selectedOption !== 'vehicleschedule') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "g":
                var defOptions = R.defOptions.addDriver;
                if (this.state.selectedOption !== 'driver') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "h":
                var defOptions = R.defOptions.removeRoute;
                if (this.state.selectedOption !== 'removeroute') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "i":
                var defOptions = R.defOptions.removeSchool;
                if (this.state.selectedOption !== 'removeschool') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "j":
                var defOptions = R.defOptions.removeStudent;
                if (this.state.selectedOption !== 'removestudent') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "k":
                var defOptions = R.defOptions.removeParent;
                if (this.state.selectedOption !== 'removeparent') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "l":
                var defOptions = R.defOptions.removeContract;
                if (this.state.selectedOption !== 'removecontract') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "m":
                var defOptions = R.defOptions.removeVehicle;
                if (this.state.selectedOption !== 'removevehicle') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "n":
                var defOptions = R.defOptions.removeTablet;
                if (this.state.selectedOption !== 'removetablet') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            case "o":
                var defOptions = R.defOptions.changeTablet;
                if (this.state.selectedOption !== 'changetablet') {
                    defOptions.dataList = null
                }
                this.setState(defOptions);
                break;
            default:
                this.setState({
                    selectedOption: null,
                    selectedOptionHeader: null,
                    selectedOptionSubHeader: null,
                    dataList: null
                });
        }
    }

    onDataProcess(dataList) {
        this.setState({
            dataList: dataList
        })
    }

    onSendClicked() {
        this.setState({
            loading: true
        })
        switch (this.state.selectedOption) {
            case "route":
                this.apiAdapterPromise = this.routesApi.createRoutesBulk(this.state.dataList);
                break;
            case "vehicleschedule":
                this.apiAdapterPromise = this.vehicleScheduleApi.createVSBulk(this.state.dataList);
                break;
            case "tablet":
                this.apiAdapterPromise = this.tabletApi.createBulkTablets(this.state.dataList);
                break;
            case "driver":
                this.apiAdapterPromise = this.driverApi.createBulkDrivers(this.state.dataList);
                break;
            case "removeroute":
                this.apiAdapterPromise = this.routesApi.deleteAllRoutes();
                break;
            case "removeroutebycontract":
                this.apiAdapterPromise = this.routesApi.removeRoutesForContract(contractid);
                break;
            case "removevehicle":
                this.apiAdapterPromise = this.vehicleApi.deleteAllVehicles();
                break;
            case "removetablet":
                this.apiAdapterPromise = this.tabletApi.deleteAllTablets();
                break;
            case "removestudent":
                this.apiAdapterPromise = this.studentsApi.deleteAllStudents();
                break;
            case "removeparent":
                this.apiAdapterPromise = this.parentsApi.deleteAllParents();
                break;
            case "changetablet":
                this.apiAdapterPromise = this.tabletApi.changeTablets(this.state.dataList);
                break;
            default:
                this.apiAdapterPromise = null;
        }

        this.apiAdapterPromise && this.apiAdapterPromise.then(function (e) {
            this.setState({
                selectedOption: null,
                selectedOptionHeader: null,
                selectedOptionSubHeader: null,
                dataList: null,
                loading: false
            });
            notservice.openNotificationWithIcon('success', " Toplu işlem başarılı.");
        }.bind(this))
            .catch(function (e) {
                this.setState({
                    loading: false
                });
                notservice.openNotificationWithIcon('error', " Toplu işlem başarısız.");
            }.bind(this));
    }

    render() {
        return (
            <div>
                <AppWidget
                    headerText={'Toplu İşlem Seçenekleri'}
                    headerSubText={'Yapmak istediğiniz toplu işlem tipini seçin.'}
                >
                    <Row style={{ padding: '40px' }}>
                        <Col span={14}>
                            <BulkOpsTypeSelectionRadioGroup
                                onValueChanged={this.onSelectionChanged}
                            />
                        </Col>
                        <Col span={10}>
                            {this.renderOpTypeArea()}
                        </Col>
                    </Row>
                </AppWidget>
                {this.state.selectedOption &&
                    this.state.dataList &&
                    this.state.dataList.length > 1 &&
                    <AppWidget
                        headerText={this.state.selectedOptionHeader}
                        headerSubText={this.state.selectedOptionSubHeader}
                    >
                        <Row style={{ padding: '40px' }}>
                            <Col span={24}>
                                <BulkOperationsTable
                                    dataType={this.state.selectedOption}
                                    data={this.state.dataList}
                                    loading={this.state.loading}
                                />
                            </Col>
                        </Row>
                        <Row style={{ margin: '30px' }}>
                            <Col offset={20} span={4}>
                                <Button type="primary" block onClick={this.onSendClicked} loading={this.state.loading} >Gönder</Button>
                            </Col>
                        </Row>
                    </AppWidget>}
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

const connectedBulkOps = connect(mapStateToProps)(index);

export default connectedBulkOps;

