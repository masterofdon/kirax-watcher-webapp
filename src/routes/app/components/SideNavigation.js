import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import 'styles/routes/app/components/SubMenu.css';
import { connect } from 'react-redux';

class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            current: "1"
        }
        this.menuItemOnClickHandler = this.menuItemOnClickHandler.bind(this);
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

    menuItemOnClickHandler(item) {
        this.setState({
            current: item.key,
        });
    }

    render() {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[]}
                mode="inline"
                theme="dark"
                selectedKeys={[this.state.current]}
                inlineCollapsed={this.state.collapsed}
                onClick={this.menuItemOnClickHandler}
                style={{ background: "#213982" }}
            >
                <Menu.Item key="1" >
                    <Icon type="profile" />
                    <span>Kayıt Yönetimi</span>
                    <Link to={"/dashboard"}></Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Icon type="user" />
                    <span>Kullanıcı Yönetimi</span>
                    <Link to={"/admin/users"}></Link>
                </Menu.Item>
            </Menu>
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

const connectedSideNavigation = connect(mapStateToProps)(SideNavigation);

export default connectedSideNavigation;