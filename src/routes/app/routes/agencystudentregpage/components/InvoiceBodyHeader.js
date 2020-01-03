import React from 'react';

import { Row, Col } from 'antd';
import InvoiceUpperSummary from './InvoiceUpperSummary'

import { timeservice } from 'routes/app/_services/timeutil.service';

export default class InvoiceBodyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { targetName, targetAddress, studentsadded } = this.props;
        const styles = {
            headerSayinStyle: {
                fontWeight: '600',
                fontSize: '16px'
            },
            headerTargetNameStyle: {
                fontWeight: '600',
                fontSize: '16px'
            },
            headerTargetAddressStyle: {
                fontWeight: '400',
                fontSize: '14px'
            }
        };

        var finalSum = 0;
        console.log(studentsadded);
        if (studentsadded) {
            for (var y = 0; y < studentsadded.length; y++) {
                var { district, discounts, grade, pricingpolicy , cutby } = studentsadded[y];
                var finalAmount = 0;
                if (district && pricingpolicy) {
                    for (var x = 0; x < district.prices.length; x++) {
                        if (district.prices[x].grade == grade) {
                            if (district.prices[x].pricingpolicy.id == pricingpolicy.id) {
                                finalAmount = district.prices[x].price.amount;
                                if(discounts){
                                    for (var i = 0; i < discounts.length; i++) {
                                        finalAmount = ((100 - discounts[i].value) * finalAmount) / 100
                                    }
                                }                                
                                if (cutby && !isNaN(cutby)) {
                                    finalAmount -= cutby;
                                }
                                break;
                            }
                        }
                    }
                }

                finalSum += finalAmount;
            }
        }

        return (
            <Row>
                <Col span={6}>
                    <p style={styles.headerSayinStyle}>Sayin ,</p>
                    <p style={styles.headerTargetNameStyle}>{targetName}</p>
                    <div style={styles.headerTargetAddressStyle}>
                        {targetAddress}
                    </div>
                </Col>
                <Col offset={4} span={14}>
                    <InvoiceUpperSummary
                        invoiceNo={"13094891"}
                        invoiceDate={timeservice.convertToDateNoTime(new Date(), "/")}
                        amountDue={finalSum + " TL"}
                    />
                </Col>
            </Row>
        );
    }
}