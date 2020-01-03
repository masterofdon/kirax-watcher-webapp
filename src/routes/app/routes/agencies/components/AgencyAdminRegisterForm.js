import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button } from 'antd';
import R from '../config/R';
const FormItem = Form.Item;
const Option = Select.Option;
import AgencyAdminsNetworkAdapter from 'services/network/AgencyAdminsNetworkAdapter';

export default class AgencyAdminRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.apiAdapter = new AgencyAdminsNetworkAdapter({ username: "admin", password: 'password' });
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var agencyAdmin = new AgencyAdmin(values.name, values.address);
                this.apiAdapter.createAgency(agencyAdmin)
                    .then(function (data) {
                        this.handleReset();
                        this.props.handleAgencyAdminCreated(data);
                    }.bind(this))
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        });
    }

    componentDidMount() {
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
        var agencyMap = this.props.agencies.map(function (e) {
            return <Option key={e.id} value={e.name} >{e.name}</Option>
        });
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...R.formItemLayout}
                    label="Tur Firması Adı"
                >
                    {getFieldDecorator('agencyname', {
                        rules: [{
                            required: true, message: 'Lütfen geçerli bir okul adı giriniz.',
                        }],
                    })(
                        <Select>
                            {agencyMap}
                        </Select>
                        )}
                </FormItem>

                <FormItem
                    {...R.formItemLayout}
                    label="Yönetici Kullanıcı Adı"
                >
                    {getFieldDecorator('username', {
                        rules: [{}],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...R.formItemLayout}
                    label="Yönetici Email Adresi"
                >
                    {getFieldDecorator('email', {
                        rules: [{}],
                    })(
                        <Input />
                        )}
                </FormItem>

                <FormItem
                    {...R.formItemLayout}
                    label="Yönetici Telefonu"
                >
                    {getFieldDecorator('phone', {})(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem {...R.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Kaydet</Button>
                </FormItem>
            </Form>
        );
    }
}