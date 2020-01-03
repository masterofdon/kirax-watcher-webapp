import React, { Component } from 'react';
import { Button, Row, Col , Icon} from 'antd';
import 'styles/routes/app/components/WidgetHeader.css';
import 'styles/routes/app/components/WidgetHeaderIcons.css';
export default class WidgetHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { text, subtext, icon, bgColor, color, headerToolboxOptions } = this.props;
        return (
            <div style={{ padding: '7.5px 15px', backgroundColor: bgColor, color: color }}
                className={this.props.className}>
                <Row type='flex' align="middle">
                    {icon && <Col style={{
                        display : 'flex'
                    }} span={1}>
                        <Icon style={{
                            lineHeight: '40px',
                            margin : 'auto',
                            minWidth: '14px',
                            fontSize : 36,
                            justifyContent : 'center'
                        }} className={'widet-header-gicon-' + icon}
                        type={icon}
                        ></Icon>
                    </Col>}
                    <Col span={17}>
                        <span className={'widget-header-text-container'}>
                            <span className={'widget-header-text-item widget-header-text'} >{text}</span>
                            <span className={'widget-header-text-item widget-header-subtext'} >{' ' + subtext}</span>
                        </span>
                    </Col>
                    <Col span={5} offset={1}>
                        <span style={{ float : 'right'}}>
                            {headerToolboxOptions}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}