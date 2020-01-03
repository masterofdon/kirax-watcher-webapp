import React from 'react';

import InvoiceBodyHeader from './InvoiceBodyHeader';

export default class InvoiceBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const { targetName , targetAddress , studentsadded} = this.props;
        return(
            <div>
                <InvoiceBodyHeader 
                    targetName={targetName}
                    targetAddress={targetAddress}
                    studentsadded={studentsadded}
                />
            </div>
        );
    }

}