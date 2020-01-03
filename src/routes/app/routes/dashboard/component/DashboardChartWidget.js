import React, { Component } from 'react';
import { Tooltip , Button } from 'antd';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';

export default class DashboardChartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
        this.handlePNGSave = this.handlePNGSave.bind(this);
    }

    componentDidMount() {

    }

    handlePNGSave(){
        this.props.onPNGSaveClicked();
    }

    handleRefreshButtonClick() {
        this.props.onRefreshClicked();
    }

    render() {
        const { headerText, headerSubText } = this.props;
        return (
            <div>
                <AppWidget
                    headerText={headerText}
                    headerSubText={headerSubText}
                    headerIcon={'header'}
                    bodyStyle={S.styles.widget.wigetbodystyle}
                    toolboxOptions={
                        <div style={{ display: 'float' }}>
                            <Tooltip title="PNG olarak Kaydet">
                                <Button style={{ marginLeft: '5px' }} onClick={this.handleSysreqDetailsClose} shape="circle" icon="instagram" />
                            </Tooltip>
                            <Tooltip title="Yenile">
                                <Button style={{ marginLeft: '5px' }} onClick={this.handleRefreshButtonClick} shape="circle" icon="reload" />
                            </Tooltip>
                        </div>
                    }
                >
                    {this.props.children}
                </AppWidget>
            </div>
        );
    }
}