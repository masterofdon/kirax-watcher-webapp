import React , {Component} from 'react';

export default class AgencyProfile extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <div>AgencyPROFILE{this.props.match.params.id}</div>
        );
    }
}