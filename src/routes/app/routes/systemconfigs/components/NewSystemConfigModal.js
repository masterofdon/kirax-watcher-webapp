import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import SystemConfig from '../model/SystemConfig';
import { connect } from 'react-redux';
import SystemConfigsNetworkAdapter from 'services/network/SystemConfigsNetworkAdapter';

const FormItem = Form.Item;

class NewSystemConfigModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        this.systemConfigApi = new SystemConfigsNetworkAdapter(this.props.user.user);
    }

    handleCreate(){
        this.props.form.validateFieldsAndScroll((err , values) => {
            if(!err){
                var sysConfig = new SystemConfig(values.category , values.configkey , values.value);
                this.systemConfigApi.createNewSystemConfig(sysConfig)
                .then(function(data){
                    this.props.onCreate
                }.bind(this))
                .catch(function(error){

                });
                console.log(sysConfig);
            }

        });
    }

    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Yeni Sistem Ayarı Oluştur"
                okText="Kaydet"
                cancelText="İptal"
                onCancel={onCancel}
                onOk={this.handleCreate}
                destroyOnClose={true}
            >
                <Form layout="vertical">
                    <FormItem label="Birim">
                        {getFieldDecorator('configkey', {
                            rules: [{ required: true, message: 'Birim girmek zorunludur!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Değer">
                        {getFieldDecorator('value', {
                            rules: [{ required: true, message: 'Değer girmek zorunludur!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('category', {
                            initialValue: 'SYSTEM',
                        })(
                            <Radio.Group>
                                <Radio value="SYSTEM">SİSTEM</Radio>
                                <Radio value="TABLET">TABLET</Radio>
                                <Radio value="USER">KULLANICI</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
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

const connectedNewSystemConfigModal = connect(mapStateToProps)(NewSystemConfigModal);

export default connectedNewSystemConfigModal;