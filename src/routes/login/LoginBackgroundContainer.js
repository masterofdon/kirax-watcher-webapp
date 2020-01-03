import React , {Component} from 'react';

export default class LoginBackgroundContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        const backgroundStyle = {
            minHeight : '100vh', 
            background: 'linear-gradient(0deg, rgba(1,15,62,1) 0%, rgba(1,15,62,1) 100%)',
            backgroundRepeat : "no-repeat", 
            backgroundSize : "100% 100%"
        }
        return(
            <div style={backgroundStyle}>
                {this.props.children}
            </div>
        );
    }
}