import React, { Component } from 'react';
import { Form, Select, Input, Button } from 'antd';
import R from '../config/R';
import SystemRequest from '../model/SystemRequest.';
import SystemRequestsNetworkAdapter from 'services/network/SystemRequestsNetworkAdapter';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddSysreqForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            selectedQueue: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onQueueSelected = this.onQueueSelected.bind(this);
    }

    componentDidMount() {
        this.systemRequestApi = new SystemRequestsNetworkAdapter(this.props.user.user);
    }

    handleSubmit(item) {
        item.preventDefault();
        this.props.form.validateFieldsAndScroll(function (err, values) {

            if (!err) {
                var sysreq = new SystemRequest(values.title, values.content, values.severity);
                console.log(sysreq);
                this.systemRequestApi.createRequestForQueue(this.state.selectedQueue.id, sysreq)
                    .then(function (e) {
                        this.props.onRegisterOK(e.data.id);
                    }.bind(this))
                    .catch(function (e) {
                    }.bind(this))

            }
        }.bind(this));
    }

    onQueueSearch() {

    }

    onQueueSelected(item) {
        for (var i = 0; i < this.props.queues.length; i++) {
            if (this.props.queues[i].id === item) {
                this.setState({
                    selectedQueue: this.props.queues[i]
                });
                return;
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { queues } = this.props;
        const queueMap = queues && queues.map(function (e) {
            return <Select.Option key={e.id} >{e.name}</Select.Option>
        }.bind(this));
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...R.formItemLayout}
                    label="Talep Sırası"
                >
                    {getFieldDecorator('queue', {
                        rules: [{
                            required: true, message: 'Lütfen geçerli bir SIRA seçiniz.',
                        }],
                    })(
                        <Select
                            showSearch
                            placeholder="Sıra Seçiniz..."
                            onChange={this.onQueueSearch}
                            onSelect={this.onQueueSelected}
                            filterOption={(input, option) => {
                                if (option.props.children) {
                                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                }
                                return false;
                            }}
                        >
                            {queueMap}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    {...R.formItemLayout}
                    label="Talep Konusu"
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Sistem Talebi için lütfen başlık giriniz.' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...R.formItemLayout}
                    label="Önem Derecesi"
                >
                    {getFieldDecorator('severity', {
                        rules: [{ required: true, message: 'Lütfen geçerli bir güzergah tipi seçiniz.' }],
                    })(
                        <Select>
                            <Option key={"0"} value={"MINOR"}>DEĞERLENDİRME</Option>
                            <Option key={"1"} value={"MAJOR"}>ÖNEMLİ</Option>
                            <Option key={"2"} value={"BC"}>KRİTİK</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...R.formItemLayout}
                    label="Açıklama"
                >
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Lütfen problemi birkaç cümle ile açıklaynız.' }],
                    })(
                        <TextArea
                            autosize={{ minRows: 12, maxRows: 12 }}
                        />
                    )}
                </FormItem>
                <FormItem {...R.tailFormItemLayout}>
                    <Button disabled={this.state.ready} type="primary" htmlType="submit">Kaydet</Button>
                </FormItem>
            </Form>
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

const connectedAddSysreqForm = connect(mapStateToProps)(AddSysreqForm);

export default connectedAddSysreqForm;