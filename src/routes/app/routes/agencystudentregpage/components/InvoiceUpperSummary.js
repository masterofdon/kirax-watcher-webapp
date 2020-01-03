import React from 'react';

import { Row , Col } from 'antd';

export default class InvoiceUpperSummary extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        const { invoiceNo , invoiceDate , amountDue } = this.props;
        const styles = {
            tableLeftStyle : {
                fontSize : '16px',
                fontWeight : '600',
                marginTop : 'auto' , 
                marginBottom : 'auto',
                padding : '10px'
            }
        }
        return(
            <div>
                <Row>
                    <Col span={10}>
                        <p style={styles.tableLeftStyle}>Fatura#</p>
                    </Col>
                    <Col span={10} offset={4}>
                        <p style={styles.tableLeftStyle}>{invoiceNo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <p style={styles.tableLeftStyle}>Fatura Tarihi</p>
                    </Col>
                    <Col span={10} offset={4}>
                        <p style={styles.tableLeftStyle}>{invoiceDate}</p>
                    </Col>
                </Row>
                <Row style={{ backgroundColor : '#eee'}}>
                    <Col span={10}>
                        <p style={styles.tableLeftStyle}>Tutar</p>
                    </Col>
                    <Col span={10} offset={4}>
                        <p style={styles.tableLeftStyle}>{amountDue}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}