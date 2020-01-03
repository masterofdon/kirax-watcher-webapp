import React, { Component } from 'react';
import { Card , Row , Col , Icon } from 'antd';

export default class AgenciesStatCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {iconstyle , stattext , statvalue} = this.props;
        const cardStyle = {
            marginTop: '10px',
            borderRadius: '5px',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
        }
        return (
            <Card style={cardStyle}>
                <Row justify={'center'}>
                    <Col span={3}>
                        <Icon style={iconstyle} />                        
                    </Col>
                    <Col span={15} offset={6} >
                        <h5>{stattext}</h5>
                        <h1>{statvalue}</h1>
                    </Col>
                </Row>
            </Card>
        );
    }
}