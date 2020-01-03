import React, { Component } from 'react';
import { Col, Row, notification, Spin, message } from 'antd';
import ProfileSummary from 'routes/app/routes/profiles/components/ProfileSummary';
import AgenciesNetworkAdapter from 'services/network/AgenciesNetworkAdapter';
import AgencyAdminLiveVehicleWatch from './components/AgencyAdminLiveVehicleWatch';
import AgencyAdminLiveCameraWatch from './components/AgencyAdminLiveCameraWatch';
import { connect } from 'react-redux';
import StatCard from 'routes/app/components/StatCard'
import R from './config/R';
import RouteTableWidget from 'routes/app/routes/routemgmt/components/RouteTableWidget';
import StatsNetworkAdapter from '../../../../services/network/StatsNetworkAdapter';
import VoyagesNetworkAdapter from 'services/network/VoyagesNetworkAdapter';
import RoutesNetworkAdapter from '../../../../services/network/RoutesNetworkAdapter';

const DAYS = [
    'SUNDAY',
    'MONDAY',
    "TUESDAY",
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
]

class AgencyAdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            selectedRoute: null,
            selectedVehicles: [],
            agencyprofileid: this.props.match.params.id,
            agency: null,
            totalNumberOfRoutes: 0,
            totalNumberOfCompletedVoyages: 0,
            totalNumberOfStudents: 0,
            activeVehicleCount: 0,
            selectedVoyage: null,
            mode: "live",
            loadingVoyageData: false,
            pastVoyageVehicle: null,
            lastRouteSelected: null
        }
        this.fetchStats = this.fetchStats.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.handleOnPastVoaygeSelected = this.handleOnPastVoaygeSelected.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
    }

    getRouteDetails(routeid) {
        return this.routesAdapter.getRoute(routeid);
    }

    getVoyage(voyageid) {
        return this.voyagesAdapter.getVoyage(voyageid, { page: 0, size: 5 });
    }

    getVoyageLogs(voyageid) {
        return this.voyagesAdapter.getVoyageLogs(voyageid, { page: 0, size: 10 });
    }

    getVoyagePath(voyageid) {
        return this.voyagesAdapter.getVoyagePath(voyageid);
    }

    fetchAgencyProfile() {
        this.agencyAdminPageAdapter.getAgency(this.state.agencyprofileid)
            .then(function (data) {
                this.setState({
                    agency: data.data
                })
            }.bind(this))
            .catch(function (e) {

            }.bind(this));
    }

    fetchStats() {
        this.statAdapter.getTotalNumberOfRoutes(this.props.user.user.agencyid)
            .then(function (data) {
                this.setState({
                    totalNumberOfRoutes: data.data.value
                });
                return this.statAdapter.getNumberOfActiveVehicles(this.props.user.user.agencyid);
            }.bind(this))
            .then(function (data) {
                this.setState({
                    activeVehicleCount: data.data.value
                });
                return this.statAdapter.getTotalStudents(this.props.user.user.agencyid);
            }.bind(this))
            .then(function (data) {
                this.setState({
                    totalNumberOfStudents: data.data.value
                });
                return this.statAdapter.getTodaysCompletedVoyages(this.props.user.user.agencyid);
            }.bind(this))
            .then(function (data) {
                this.setState({
                    totalNumberOfCompletedVoyages: data.data.value
                });
            }.bind(this));

    }

    handleDateSelected(date) {
        console.log(date);
        if (this.statAdapter.lastRouteSelected) {
            this.handleOnPastVoaygeSelected(this.state.route, date);
        }
    }

    handleOnPastVoaygeSelected(route, date, dateDelimeter) {
        this.setState({ mode: "past", lastRouteSelected: route });
        if (date == null) {
            var dateObj = new Date();

            var year = dateObj.getFullYear();

            var month = dateObj.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = dateObj.getDate();

            date = day + "/" + month + "/" + year;
        }
        var dayOfWeek = dateObj.getDay();
        this.setState({ loadingVoyageData: true });
        var splittedDate = date.split("/").reverse().join("");
        var voyageId = route.id + "_" + splittedDate;
        this.getRouteDetails(route.id)
            .then(function (data) {
                this.setState({ pastVoyageVehicle: findVSForDate(data.data, dayOfWeek).vehicle });
                return this.getVoyage(voyageId)
            }.bind(this))
            .then(function (data) {
                this.setState({ selectedVoyage: data.data, selectedRoute: route });
                return this.getVoyageLogs(voyageId);
            }.bind(this))
            .then(function (data) {
                return this.getVoyagePath(voyageId);
            }.bind(this))
            .catch(function (error) {
                this.setState({
                    loadingVoyageData: false
                })
                this.openNotificationWithIcon('error', "Son Sefer bilgileri alinirken bir hatayla karşılaşıldı.");
            }.bind(this))
            .then(function (path) {
                const mapper = path.data.map((e) => {
                    return e.data.location;
                });
                const tapper = path.data.map((e) => {
                    return e.data.speed;
                });
                if (path) {
                    this.setState({
                        currentPath: mapper,
                        speedMap: tapper,
                        fapper: path.data,
                        loadingVoyageData: false
                    })
                }
            }.bind(this))
            .catch(function (error) {
                this.setState({
                    loadingVoyageData: false
                })
                this.openNotificationWithIcon('error', "Sefer GPS alinirken bir hatayla karşılaşıldı.");
            }.bind(this));
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Güzergah İşlem Hatası',
            description: message,
            duration: 10
        });
    };

    componentDidMount() {
        this.agencyAdminPageAdapter = new AgenciesNetworkAdapter(this.props.user.user);
        this.statAdapter = new StatsNetworkAdapter(this.props.user.user);
        this.voyagesAdapter = new VoyagesNetworkAdapter(this.props.user.user);
        this.routesAdapter = new RoutesNetworkAdapter(this.props.user.user);
        this.fetchAgencyProfile();
        this.fetchStats();
    }


    render() {
        const { agency, selectedRoute, selectedVoyage, mode, pastVoyageVehicle } = this.state;
        const facebook = agency && agency.account && agency.account.facebook;
        const twitter = agency && agency.account && agency.account.twitter;
        return (
            <div style={R.styles.containerStyle}>
                <Row style={{ marginTop: 10 }} type="flex">
                    <Col span={6} order={1}>
                        <StatCard
                            iconstyle={R.styles.vehicleIcon}
                            stattext={'Toplam Servis Sayısı'}
                            statvalue={this.state.activeVehicleCount}
                        />
                    </Col>
                    <Col span={6} order={2}>
                        <StatCard
                            iconstyle={R.styles.routeIcon}
                            stattext={'Toplam Rota Sayısı'}
                            statvalue={this.state.totalNumberOfRoutes}
                        />
                    </Col>
                    <Col span={6} order={3}>
                        <StatCard
                            iconstyle={R.styles.studentIcon}
                            stattext={'Toplam Öğrenci Sayısı'}
                            statvalue={this.state.totalNumberOfStudents}
                        />
                    </Col>
                    <Col span={6} order={4}>
                        <StatCard
                            iconstyle={R.styles.notificationIcon}
                            stattext={'Yapılan Bildirim Sayısı'}
                            statvalue={this.state.totalNumberOfCompletedVoyages}
                        />
                    </Col>
                </Row>
                <Row className={'profile-content'} type={'flex'} gutter={16}>
                    <Col span={24}>
                        <Row style={R.styles.rowStyle}>
                            <Col span={24}>
                                <Spin spinning={this.state.loadingVoyageData}>
                                    <AgencyAdminLiveVehicleWatch
                                        mode={'live'}
                                        route={selectedRoute}
                                        voyage={selectedVoyage}
                                        agency={agency}
                                        voyagePath={this.state.currentPath}
                                        speedMap={this.state.speedMap}
                                        path={this.state.fapper}
                                        voyageVehicle={pastVoyageVehicle}
                                        handleDateSelected={this.handleDateSelected}
                                    />
                                </Spin>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <RouteTableWidget
                                    onVoyageClicked={this.handleOnPastVoaygeSelected}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function findVSForDate(route, day) {
    for (var i = 0; i < route.vehicleSchedules.length; i++) {
        if (route.vehicleSchedules[i].day == DAYS[day]) {
            return route.vehicleSchedules[i];
        }
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

const connectedAgencyAdminPage = connect(mapStateToProps)(AgencyAdminPage);

export default connectedAgencyAdminPage;
