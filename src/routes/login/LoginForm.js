import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Icon } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;

import { userActions } from 'routes/app/_actions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(function (err, values) {
            if (!err) {
                if (username && password) {
                    this.props.dispatch(userActions.login(values.username, values.password, this.loginCallback.bind(this)));
                }
            }
        }.bind(this));
    }


    loginCallback(status, userItem) {
        if (status == "success") {
            if (userItem) {
                var item = {
                    loggedIn: true,
                    user: userItem
                }
                localStorage.setItem('user', JSON.stringify(item));
            }
            this.props.onLoginSuccess();
        } else if (status === "failed") {
            this.props.onLoginFailed();
        } else {
            this.props.onLoginFailed();
        }
    }

    render() {
        const { getFieldDecorator , setFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                },
            },
        };
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true, message: 'Lütfen geçerli bir kullanıcı adı giriniz.',
                            }],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Kullanıcı Adı"
                                size={'large'} />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Lütfen geçerli bir parola giriniz.',
                            }],
                        })(
                            <Input
                                prefix={
                                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Parola"
                                size={'large'}
                            />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button 
                            block={true} 
                            size={'large'} 
                            style={{ 
                                backgroundColor: '#b1bde0', 
                                padding: "0px 30px" , 
                                height: '48px' ,
                                fontWeight : '700',
                                fontSize : '28px',
                                color : "#13328f"
                            }} 
                            htmlType="submit">Giriş</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const connectedLoginForm = connect()(LoginForm);

export default connectedLoginForm;