import React, { Component } from 'react';
import { Form, Select, Input, Button, Spin } from 'antd';
import SystemRequest from '../model/SystemRequest.';
import SystemRequestsNetworkAdapter from 'services/network/SystemRequestsNetworkAdapter';
import { connect } from 'react-redux';
import R from '../config/R';

const FormItem = Form.Item;

const Option = Select.Option;

class SysreqStatusForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.systemRequestApi = new SystemRequestsNetworkAdapter(this.props.user.user);
    }

    handleSubmit(item) {
        item.preventDefault();
        this.props.form.validateFieldsAndScroll(function (err, values) {

            if (!err) {
                this.setState({
                    loading: true
                })
                this.props.sysreq.severity = values.severity;
                this.props.sysreq.requestStatus = values.status;
                this.systemRequestApi.updateRequest(this.props.sysreq.id, this.props.sysreq)
                    .then(function (e) {
                        this.props.onUpdateOK(e.data.id);
                        this.setState({
                            loading: false
                        })
                    }.bind(this))
                    .catch(function (e) {
                    }.bind(this))

            }
        }.bind(this));
    }

    render() {
        const { getFieldDecorator , getFieldProps} = this.props.form;
        const { sysreq } = this.props;
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                        {...R.formItemLayout}
                        label="Durumu"
                    >
                        {getFieldDecorator('status', {
                            name : "status",
                            rules: [{ required: true, message: 'Lütfen geçerli bir güzergah tipi seçiniz.' }],
                            initialValue: sysreq.requestStatus
                        })(
                            <Select>
                                <Option key={"OPEN"} >AÇIK</Option>
                                <Option key={"WIP"} >ÜSTÜNDE ÇALIŞILIYOR</Option>
                                <Option key={"CLOSED_RESOLVED"} >ÇÖZÜLDÜ ve KAPATILDI</Option>
                                <Option key={"CLOSED_UNRESOLVED"}>ÇÖZÜLMEDEN KAPATILDI</Option>
                                <Option key={"FUTURE_AVAILABLE"}>GELECEKTE ÇÖZÜLECEK</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...R.formItemLayout}
                        label="Önem Derecesi"
                    >
                        {getFieldDecorator('severity', {
                            rules: [{ required: true, message: 'Lütfen geçerli bir güzergah tipi seçiniz.' }],
                            initialValue: sysreq.severity
                        })(
                            <Select >
                                <Option key={"0"} value={"MINOR"}>DEĞERLENDİRME</Option>
                                <Option key={"1"} value={"MAJOR"}>ÖNEMLİ</Option>
                                <Option key={"2"} value={"BC"}>KRİTİK</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...R.tailFormItemLayout}>
                        <Button disabled={this.state.ready} type="primary" htmlType="submit">Kaydet</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedSysreqStatusForm = connect(mapStateToProps)(SysreqStatusForm);

export default connectedSysreqStatusForm;