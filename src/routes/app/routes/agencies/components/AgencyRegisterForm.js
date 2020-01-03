import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import Agency from '../models/Agency';
import R from '../config/R';
import { connect } from 'react-redux';

import AgenciesNetworkAdapter from 'services/network/AgenciesNetworkAdapter';
import AgencyRegistration from '../models/AgencyRegistration';
import AgencyAdmin from '../models/AgencyAdmin';

class AgencyRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.apiAdapter = new AgenciesNetworkAdapter(this.props.user.user);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var adminUsernameArray = values.name.split(" ");
                let adminUsernameResult = "";
                for(var i = 0 ; i < adminUsernameArray.length;i++){
                    adminUsernameResult += adminUsernameArray[i].toLowerCase();
                    if(i == adminUsernameArray.length -1){
                        adminUsernameResult += "_admin";
                    }
                }
                
                var agency = new Agency(values.name, values.address);
                var agencyAdmin = new AgencyAdmin(null , adminUsernameResult , values.contactname , values.email ,values.phone);
                let agenceyReg = new AgencyRegistration(agency , agencyAdmin);
                this.apiAdapter.createAgencyAndAdmin(agenceyReg)
                    .then(function (data) {
                        this.props.handleAgencyCreated(data);
                        this.handleReset();
                        
                    }.bind(this))
                    .catch(function (error) {
                        console.error(error);
                    });
                console.log('Received values of form: ', values);
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '90',
        })(
            <Select style={{ width: 70 }}>
                <Option value="90">+90</Option>
            </Select>
            );
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...R.formItemLayout}
                    label="Tur Firması Adı"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Lütfen geçerli bir okul adı giriniz.',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>

                <FormItem
                    {...R.formItemLayout}
                    label="Tur Firması Adres"
                >
                    {getFieldDecorator('address', {
                        rules: [{}],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...R.formItemLayout}
                    label="İrtibat Kişi Adı"
                >
                    {getFieldDecorator('contactname', {
                        rules: [{}],
                    })(
                        <Input />
                        )}
                </FormItem>

                <FormItem
                    {...R.formItemLayout}
                    label="İrtibat Kişi Telefonu"
                >
                    {getFieldDecorator('phone', {})(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...R.formItemLayout}
                    label="İrtibat Kişi Email"
                >
                    {getFieldDecorator('email', {
                        rules: [{}],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem {...R.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Kaydet</Button>
                </FormItem>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedAgencyRegisterForm = connect(mapStateToProps)(AgencyRegisterForm);

export default connectedAgencyRegisterForm;