import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import S from 'routes/app/components/S';
import ReactECharts from 'routes/app/components/ReactECharts';

var weatherIcons = {
    'Sunny': '../../../../../asset/img/icons/notification-64.png',
    'Cloudy': '../../../../../asset/img/icons/notification-64.png',
    'Showers': '../../../../../asset/img/icons/notification-64.png'
};

var seriesLabel = {
    normal: {
        show: true,
        textBorderColor: '#333',
        textBorderWidth: 2
    }
}

export default class BarChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { legends, values , banks} = this.props;
        var counter = 0;
        const data = values && values.map((value) => {
            return {
                name: legends[counter++],
                type: 'bar',
                label: seriesLabel,
                data: [value.full , value.installments , value.other]
            }
        });
        const banksMap = banks && banks.map((bank) => {
            return bank.name;
        })
        const option = {
            title: {
                text: 'KREDI KARTI TAHSİLATLARI',
                subtext: 'BANKALARA GÖRE K.K TAHSİLATLARI',
                x: 'left'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show : false,
                data: ['TEK ÇEKİM', 'TAKSİTLİ' , 'DİĞER']
            },
            grid: {
                left: 100
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
                name: 'TL',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: banksMap,
                axisLabel: {
                    formatter: function (value) {
                        return value;
                    },
                    margin: 20,
                    rich: {
                        value: {
                            lineHeight: 30,
                            align: 'center'
                        },
                        GARANTI: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: weatherIcons.Sunny
                            }
                        },
                        ISBANKASI: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: weatherIcons.Cloudy
                            }
                        },
                        YAPIKREDI: {
                            height: 40,
                            align: 'center',
                            backgroundColor: {
                                image: weatherIcons.Showers
                            }
                        }
                    }
                }
            },
            series: data
        };
        return (
            <Row style={{ marginTop: 10 }} type="flex">
                <Col span={24} order={1}>
                    <Card style={S.styles.card.cardbodystyle}>
                        <Row justify={'center'}>
                            <Col span={22} offset={2} >
                                <ReactECharts
                                    option={option}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}






;
