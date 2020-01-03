import React, { Component } from 'react';
import { Row, Col } from 'antd';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import SystemConfigTableWidget from './components/SystemConfigTableWidget';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <SystemConfigTableWidget
                />
            </div>
        );
    }
}