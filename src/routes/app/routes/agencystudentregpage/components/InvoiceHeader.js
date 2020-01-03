import React from 'react';
import { Row , Col} from 'antd';
import InvoiceHolderIcon from './InvoiceHolderIcon';

export default class InvoiceHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        const {companyAddress} = this.props;
        return(
        <div>
            <Row>
                <Col span={6}>
                    <p style={{ fontWeight : '600' , fontSize : '18px'}}>Gönderen: </p>
                    <div>
                        {companyAddress}
                    </div>
                </Col>
                <Col offset={8} span={10} style={{ marginTop : '30px'}}>
                    <InvoiceHolderIcon 

                    />
                </Col>
            </Row>
        </div>);
    }
}