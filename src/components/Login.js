import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import LoginBackgroundContainer from 'routes/login/LoginBackgroundContainer';
import LoginContainer from 'routes/login/LoginContainer';

import { Route, Redirect } from 'react-router'

import { connect } from 'react-redux';

const isNull = (e) => (e == null || e == 'undefined');
const isNotNull = (e) => (!isNull(e));

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderItem() {
        return (
            <div>
                <Layout className="layout" style={{ minHeight: '100vh' }}>
                    <Content>
                        <LoginBackgroundContainer >
                            <LoginContainer />
                        </LoginBackgroundContainer>
                    </Content>
                </Layout>
            </div>);
    }

    render() {
        var userItemFull = null;
        try {
            var userItem = JSON.parse(localStorage.getItem('user'));
            var userItemFull = isNotNull(userItem) &&
                isNotNull(userItem.user) &&
                isNotNull(userItem.user.username) &&
                isNotNull(userItem.user.token) &&
                isNotNull(userItem.user.type) &&
                isNotNull(userItem.user.agencyid) &&
                isNotNull(userItem.user.uid);
        } catch(e){
            localStorage.removeItem('user');
        }finally{
            return (
                (userItemFull)
                    ? <Redirect to={{ pathname: '/dashboard' }} />
                    : this.renderItem()

            );
        }
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

const connectedLoginPage = connect(mapStateToProps)(Login);

export default connectedLoginPage;