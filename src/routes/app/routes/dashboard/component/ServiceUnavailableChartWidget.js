import React, { Component } from 'react';
import DashboardChartWidget from './DashboardChartWidget';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import EndpointResultsNetworkAdapter from 'services/network/EndpointResultsNetworkAdapter';
import echarts from 'echarts';
import ReactECharts from 'routes/app/components/ReactECharts';
import moment from 'moment';

class ServiceUnavailableChartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false

        }
    }

    componentDidMount() {
        this.endpointsResultApiAdapter = new EndpointResultsNetworkAdapter(this.props.user.user);
        this.fetch();
    }

    fetch = () => {
        this.endpointsResultApiAdapter.get24HoursServerErrors("503")
            .then(function (data) {
                this.setState({
                    data: data.data
                })
            }.bind(this))
            .catch(function (error) {

            }.bind(this));
    }

    render() {
        const { loading, data } = this.state;
        var seriesData = data && data.map((e) => {
            let xValue = moment(e.time).format("DD/MM/YYYY HH:mm:ss");
            return {
                name: xValue,
                value: [xValue, e.count]
            }
        });
        var option = {
            title: {
                text: '503 - Service Unavailable'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return params.name;
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'category',
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: seriesData,
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                },
            }]
        };
        console.log(seriesData);
        return (
            <div>
                <Spin spinning={loading}>
                    <DashboardChartWidget
                        headerText={'Hizmet Dışı 503 - Service Unavailable'}
                        headerSubText={'Hizmet Dışı Hataları Grafiği'}
                    >
                        <ReactECharts option={option} />
                    </DashboardChartWidget>
                </Spin>
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

const connectedServiceUnavailableChartWidget = connect(mapStateToProps)(ServiceUnavailableChartWidget);

export default connectedServiceUnavailableChartWidget;