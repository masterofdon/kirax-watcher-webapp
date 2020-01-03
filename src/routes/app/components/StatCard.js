import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import S from 'routes/app/components/S';

export default class StatCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { iconstyle, stattext, statvalue } = this.props;
        return (
            <Card style={S.styles.card.cardbodystyle}>
                <Row justify={'center'}>
                    <Col span={3}>
                        <Icon style={iconstyle} />
                    </Col>
                    <Col span={15} offset={5} >
                        <h3>{stattext}</h3>
                        <h1>{statvalue}</h1>
                    </Col>
                </Row>
            </Card>
        );
    }
}