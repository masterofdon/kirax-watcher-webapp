import React from 'react';
import { Row , Col , Divider } from 'antd';
import InvoiceHeader from './InvoiceHeader';
import InvoiceBody from './InvoiceBody';

export default class Invoice extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        const { 
            invoiceHolderName , 
            invoiceHolderAddress , 
            studentsadded
        } = this.props;
        return(
        
        <div>
            <InvoiceHeader 
                companyAddress={'Tarım Mahallesi, 1613. Sokak No:40, 07200 Muratpaşa/Antalya'}
            />
            <Divider style={{ height : '4px'}} />
            <InvoiceBody
                targetName={invoiceHolderName}
                targetAddress={invoiceHolderAddress}
                studentsadded={studentsadded}
            />
        </div>
        )
    }
}