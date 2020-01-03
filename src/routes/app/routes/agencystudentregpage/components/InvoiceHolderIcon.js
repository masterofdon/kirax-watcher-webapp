import React from 'react';
import { renderComponent } from 'recompose';

export default class InvoiceHolderIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        const { icon } = this.props;

        return(
            <div>
                <img 
                    src={'/asset/images/cetintur.svg'}
                    width={199}
                    height={38}
                />
            </div>
        );
    }
}