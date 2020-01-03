import React, { Component } from 'react';
import { Row, Col, Avatar, Icon, Form, notification } from 'antd';

import LoginForm from './LoginForm';
import LoginExtraOps from './LoginExtraOps';
import { connect } from 'react-redux';

const LoginFormContainer = Form.create()(LoginForm);

import { Route, Redirect } from 'react-router'
import { Shake } from 'reshake'

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFailed = this.onLoginFailed.bind(this);
    }

    onLoginSuccess() {
        this.setState({
            loggedIn: true
        })
        // this.state.loggedIn = true;
    }

    onLoginFailed() {
        this.setState({
            loggedIn: false
        });
        this.openNotificationWithIcon('error', "Kullanıcı Adı veya Şifre Yanlış.");
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'GİRİŞ BAŞARISIZ',
            description: message,
            duration: 10
        });
    };

    render() {
        const { loggedIn } = this.state;
        if (loggedIn || (this.props.user && this.props.user.user)) {
            const item = JSON.parse(localStorage.getItem('user'));
            return item && <Redirect to={{ pathname: '/dashboard'}} />
        }
        return (
            <Row>
                <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 10, offset: 7 }}
                    md={{ span: 8, offset: 8 }}
                    lg={{ span: 8, offset: 8 }}
                    xl={{ span: 6, offset: 9 }}
                    xxl={{ span: 6, offset: 9 }}>
                    <Shake
                        h={5}
                        v={5}
                        r={2}
                        dur={1000}
                        int={10}
                        max={100}
                        fixed={true}
                        fixedStop={false}
                        freez={false}
                        q={1}
                    >
                        <Row>
                            <Col
                                xs={{ span: 20, offset: 2 }}
                                sm={{ span: 10, offset: 7 }}
                                md={{ span: 8, offset: 8 }}
                                lg={{ span: 8, offset: 8 }}
                                xl={{ span: 6, offset: 9 }}
                                xxl={{ span: 6, offset: 9 }}
                            >
                                <div style={{
                                    display : 'flex',
                                    justifyContent : 'center',
                                    margin : '24px'
                                }}>
                                    <img 
                                        src="/asset/images/kiraxlogo.png" 
                                        width="606" 
                                        height="360" />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                            >
                                <LoginFormContainer
                                    onLoginSuccess={this.onLoginSuccess}
                                    onLoginFailed={this.onLoginFailed}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <LoginExtraOps />
                        </Row>
                    </Shake>

                </Col>
            </Row>
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

const connectedLoginContainer = connect(mapStateToProps)(LoginContainer);

export default connectedLoginContainer;