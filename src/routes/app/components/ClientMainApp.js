import React, { Component } from 'react';
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { history } from '../_helpers';
import { connect } from 'react-redux';
import 'asset/css/mainapp.css';
import AppRouter from './AppRouter';

import Login from 'components/Login';
import Locked from 'components/Locked';
import Page404 from 'components/Page404';
import Page503 from 'components/Page503';
import IndexPage from 'components/IndexPage';

class ClientMainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            //dispatch(alertActions.clear());
        });
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

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={IndexPage} {...this.props}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/locked" component={Locked} />                  
                    <Route exact path="/503" component={Page503} />
                    <Route exact path="/404" component={Page404} />
                    <AppRouter history={history} {...this.props}/>
                </Switch>
            </Router>
        );
    }

}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(ClientMainApp);
export default connectedApp;
