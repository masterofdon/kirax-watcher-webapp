import React , {Component} from 'react';

export default class Pager extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const { children , page} = this.props;
        var pagerender =  this.props.children[this.props.page - 1];
        return(
            <div>
                {pagerender}
            </div>
        );
    }
}