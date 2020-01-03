import React, { Component } from 'react';
import SideNavigation from './SideNavigation';
import App from 'routes/app';
import { Layout, Button, Avatar, Badge, Dropdown, Menu, Row, Col, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import {
    Router,
    Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import SystemNotificationsAdapter from 'services/network/SystemNotificationsAdapter';

import { userActions } from 'routes/app/_actions';
import { Redirect } from 'react-router'
import S from 'routes/app/components/S'

const SubMenu = Menu.SubMenu;

const isNull = (e) => (e == null || e == 'undefined');

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            systemNotifications: [],
            unreadSystemNotificationCount: null,
            newPersonalMessage: 0,
            logginOut: false
        }
        this.menuItemOnClickHandler = this.menuItemOnClickHandler.bind(this);
        this.onNotificationMessage = this.onNotificationMessage.bind(this);

    }

    fetchNotifications() {
        this.systemNotificationsAdapter.getUnreadSystemNotifications({ uid: this.props.user.user.uid })
            .then(function (e) {
                console.log(e);
                for (var i = 0; i < e.data.length; i++) {
                    if (e.data[i].readmark == false) {
                        this.state.unreadSystemNotificationCount++;
                    }
                }
                this.setState({
                    systemNotifications: e.data,
                    unreadSystemNotificationCount: this.state.unreadSystemNotificationCount
                })
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            }.bind(this))
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logoutCallback() {
        this.setState({
            logginOut: true
        });
    }

    menuItemOnClickHandler(item) {
        var key = item.key;
        switch (key) {
            case "1":
            case "2":
            case "3":
                break;
            case "4":
                this.props.dispatch(userActions.logout(this.logoutCallback.bind(this)));
            default:
            // Do nothing.
        }
    }

    onNotificationItemClick(item) {
        var key = item.key;
        let notification = this.state.systemNotifications[Number(key) - 1];
        var x = S.sysnots[notification.notification.code];
    }

    avatarMenu = (
        <Menu onClick={this.menuItemOnClickHandler.bind(this)} style={{ width: '200px', marginTop: '10px' }}>
            <Menu.Item style={{ padding: '10px' }} key="1">Profilim</Menu.Item>
            <Menu.Item style={{ padding: '10px' }} key="2">Kişisel Mesajlar</Menu.Item>
            <Menu.Item style={{ padding: '10px' }} key="3">Ayarlar</Menu.Item>
            <Menu.Item style={{ padding: '10px' }} key="4">Çıkış</Menu.Item>
        </Menu>
    );

    renderNotifications() {
        var key = 0;
        const mappedItems = this.state.systemNotifications.map(function (e) {
            var type = e.notification.type;
            var severity = e.notification.severity;
            var code = e.notification.code;
            return <Menu.Item style={{ padding: '20px', backgroundColor: "#cd4c4c", margin: '5px' }} key={key++}>
                <Row>
                    <Col span={3}>
                        <Icon type={type == "ALARM" ? "exclamation-circle-o" : "warning"} style={{ fontSize: 32 }} />
                    </Col>
                    <Col span={21}>
                        <div style={{ fontSize: 18, overflow: 'hidden', textOverflow: "ellipsis" }}>
                            <span style={{ verticalAlign: "middle" }}>{S.sysnots[code].tr_text}</span>
                        </div>
                    </Col>
                </Row>
            </Menu.Item>
        }.bind(this));
        return <Menu onClick={this.onNotificationItemClick.bind(this)} style={{ width: 'fit-content', padding: '10px', marginTop: '10px' }}>
            {mappedItems}
        </Menu>
    }

    onNotificationMessage(item) {
        console.log(item);
        this.state.systemNotifications.push(item);
        this.setState({
            systemNotifications: this.state.systemNotifications
        })
    }

    componentDidMount(props) {
        try {
            var userItem = JSON.parse(localStorage.getItem("user"));
            if (this.state.logginOut ||
                isNull(userItem) ||
                isNull(userItem.user) ||
                isNull(userItem.user.token) ||
                isNull(userItem.user.uid) ||
                isNull(userItem.user.username)) {
                return;
            }
            this.systemNotificationsAdapter = new SystemNotificationsAdapter(this.props.user.user);
            this.fetchNotifications();
        } catch (e) {

        }

    }

    render() {
        const { history } = this.props;
        try {
            var userItem = JSON.parse(localStorage.getItem("user"));
            if (this.state.logginOut ||
                isNull(userItem) ||
                isNull(userItem.user) ||
                isNull(userItem.user.token) ||
                isNull(userItem.user.uid) ||
                isNull(userItem.user.username)) {
                return <Redirect to={{ pathname: '/login' }} />
            }
        } catch (e) {
            return <Redirect to={{ pathname: '/login' }} />
        }

        return (
            <Router {...this.props}>
                <div>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider
                            collapsible={false}
                            collapsed={this.state.collapsed}
                            style={{
                                backgroundColor : "#213982"
                            }}
                            width={300}
                        >
                            <SideNavigation

                            />
                        </Sider>
                        <Content style={{ padding: '0px 16px' , backgroundColor : "#c9d1e8"}}>
                            <Switch>
                                <App />
                            </Switch>
                        </Content>
                    </Layout>
                </div>
            </Router>
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

const connectedAppRouter = connect(mapStateToProps)(AppRouter);

export default connectedAppRouter;

