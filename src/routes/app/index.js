import React from 'react';
import AgencyStudentRegPage from './routes/agencystudentregpage';
import PaymentsPage from './routes/paymentspage'
import SysReqPage from './routes/sysreqs';
import Dashboard from './routes/dashboard';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {

    render(){
        return (

            <div style={{ marginLeft: '8px' }}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/admin/rentables" component={PaymentsPage} />
                    <Route exact path="/admin/bookings" component={SysReqPage} />
                    <Redirect to="/404" />
                </Switch>
            </div>
        );
    }
}

export default App;