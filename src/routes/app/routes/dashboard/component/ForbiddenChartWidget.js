import React, { Component } from 'react';
import DashboardChartWidget from './DashboardChartWidget';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import EndpointResultsNetworkAdapter from 'services/network/EndpointResultsNetworkAdapter';
import echarts from 'echarts';
import ReactECharts from 'routes/app/components/ReactECharts';
import moment from 'moment';

class ForbiddenChartWidget extends Component {
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
        this.endpointsResultApiAdapter.get24HoursServerErrors("403")
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
                text: '403 - Forbidden'
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
            toolbox: {
                feature: {
                    saveAsImage: {}
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
                        headerText={'Kullanıcı Yetkisiz İşlem 403 - Forbidden'}
                        headerSubText={'Kullanıcı Yetkisiz İşlem Hataları Grafiği'}
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

const connectedForbiddenChartWidget = connect(mapStateToProps)(ForbiddenChartWidget);

export default connectedForbiddenChartWidget;