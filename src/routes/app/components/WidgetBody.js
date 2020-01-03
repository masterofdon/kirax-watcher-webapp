import React , {Component} from 'react';

export default class WidgetBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        var {style} = this.props;
        style = style || {};
        // style.flex = '1';
        // style.padding = '2.5px 15px';
        return(
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}