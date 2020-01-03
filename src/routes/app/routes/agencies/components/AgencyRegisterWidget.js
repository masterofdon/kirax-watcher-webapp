import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import AppWidget from 'routes/app/components/AppWidget';

import R from '../config/R';
import S from 'routes/app/components/S';

import AgencyRegisterForm from './AgencyRegisterForm';
import AgencyAdminRegisterForm from './AgencyAdminRegisterForm';
import Pager from 'routes/app/components/Pager';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const pages = {
    page1: {
        headerText: 'Tur Firması Ekle',
        headerSubText: 'Tur Firması Ekleme Sihirbazı'
    },
    page2: {
        headerText: 'Tur Firması Yönetici Ekle',
        headerSubText: 'Tur Firması Yönetici Ekleme Sihirbazı'
    }
};

export default class AgencyRegisterWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            leftButtonDisabled: true,
            righButtonDisabled: false,
            headerText: pages.page1.headerText,
            headerSubText: pages.page1.headerSubText
        }
    }

    onLeftClickHandler() {
        var disableButton = false;
        if (this.state.currentPage == 2) {
            disableButton = true;
        }
        this.state.currentPage--;
        this.setState({
            leftButtonDisabled: disableButton,
            righButtonDisabled: false,
            currentPage: this.state.currentPage,
            headerText: pages.page1.headerText,
            headerSubText: pages.page1.headerSubText
        });
        console.log("LEFT BUTTON CLICKED");

    }

    onRightClickHandler() {
        var disableButton = false;
        if (this.state.currentPage == 1) {
            disableButton = true;
        }
        this.state.currentPage++;
        this.setState({
            righButtonDisabled: disableButton,
            leftButtonDisabled: false,
            currentPage: this.state.currentPage,
            headerText: pages.page2.headerText,
            headerSubText: pages.page2.headerSubText
        });
        console.log("RIGHT BUTTON CLICKED");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { currentPage, headerText, headerSubText } = this.state;
        const tools = <div style={{ display : 'flex' , flex : '1 1 auto' , flexFlow : 'row'}}>
            <div style={{margin : '4px'}}>
                <Button size={'small'} disabled={this.state.leftButtonDisabled} onClick={this.onLeftClickHandler.bind(this)}>
                    <Icon shape={"circle"} type="left-circle" />
                </Button>
            </div>
            <div style={{margin : '4px'}}>
                <Button size={'small'} disabled={this.state.righButtonDisabled} onClick={this.onRightClickHandler.bind(this)}>
                    <Icon shape={"circle"} type="right-circle" />
                </Button>
            </div>
        </div>;

        return (
            <AppWidget
                headerText={headerText}
                headerSubText={headerSubText}
                bodyStyle={S.styles.wigetbodystyle}
                toolboxOptions={tools}
            >
                <Pager
                    page={currentPage}
                >
                    <AgencyRegisterForm
                        form={this.props.form}
                        handleAgencyCreated={this.props.handleAgencyCreated}
                    />
                    <AgencyAdminRegisterForm
                        form={this.props.form}
                        agencies={this.props.agencies}
                        handleAgencyAdminCreated={this.props.handleAgencyAdminCreated}
                    />
                </Pager>
            </AppWidget>
        );
    }
}