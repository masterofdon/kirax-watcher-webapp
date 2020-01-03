import React , {Component} from 'react';
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux';

class IndexPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const x = JSON.parse(localStorage.getItem('user'));
        return(
            <Route {...this.props} exact render={props => (
                localStorage.getItem('user')
                    ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
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

const connectedIndexPage = connect(mapStateToProps)(IndexPage);

export default connectedIndexPage;