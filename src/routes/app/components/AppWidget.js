import React, { Component } from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import 'styles/routes/app/components/Widget.css'
import { Row, Col } from 'antd';

export default class AppWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() { }

    render() {
        const { headerText, headerSubText, headerIcon, headerStyle, bodyStyle, toolboxOptions } = this.props;
        const style = {
            colStyle: {
                marginTop: '10px',
                borderRadius: '5px',
                backgroundColor: 'white',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
            },
            colStyleAlt : {
                marginTop: '10px',
                borderRadius: '5px',
                backgroundColor: 'white',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
            },
            headerBgColor : "#143491",
            headerBgColorAlt : "#dbca6a",
            headerBgColorAlt2 : "#5970b3",
            headerColor : "white",
            headerColorAlt : "white"
        }
        return (
            <div style={style.colStyle} className={'widget-container'}>
                <WidgetHeader
                    text={headerText}
                    subtext={headerSubText}
                    icon={headerIcon}
                    bgColor={style.headerBgColorAlt2}
                    color={style.headerColor}
                    style={headerStyle}
                    className={'react-grid-dragger'}
                    headerToolboxOptions={toolboxOptions}
                />
                <WidgetBody
                    style={bodyStyle}
                >
                    {this.props.children}
                </WidgetBody>
            </div>
        );
    }
}