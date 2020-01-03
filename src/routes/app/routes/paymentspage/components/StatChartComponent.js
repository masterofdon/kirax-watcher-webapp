import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import S from 'routes/app/components/S';
import ReactECharts from 'routes/app/components/ReactECharts';

export default class StatChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { legendnames , values } = this.props;
        var data = {};
        data.seriesData = [];
        var counter = 0;
        data.selected = {};
        data.seriesData = values && values.map((value) => {
            data.selected[legendnames[counter]]
            return {
                name : legendnames[counter++],
                value,
            }            
        });
        data.legendData = legendnames || [];
        
        var option = {
            title: {
                text: 'TAHSİLAT METODU DAĞILIMI',
                subtext: 'BUGÜNE KADAR TÜM TAHSİLATLAR İÇİN',
                x: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                top: 20,
                bottom: 20,
                right : 10,
                data: data.legendData,
                selected: data.selected
            },
            series: [
                {
                    name: 'DAGILIM',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '60%'],
                    data: data.seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
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

function genData(count) {
    var nameList = [
        "NAKİT",
        "KREDİ KARTI"
    ];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < 2; i++) {
        name = nameList[i];
        legendData.push(name);
        seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
        });
        selected[name] = i < 3;
    }

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}
