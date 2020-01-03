import React, { Component } from 'react';
import { Modal, Button, Row, Col, Checkbox, Divider, Icon } from 'antd';

export default class OverrideModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            emailoverride : false,
            tcknoverride : false,
            phonenumberoverride : false
        }
    }

    showModal = () => {
    }

    handleOk = () => {
        this.props.onOk();
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    renderParentRow(parent) {
        const { email, phoneNumber, tckn, name, reason } = parent;
        const styles = {
            pNormalStyle: {
                fontSize: '20px',
                fontWeight: '600'
            },
            pSubStyle: {
                fontSize: '18px',
                fontWeight: '500'
            },
            pChangedStyle: {
                fontSize: '20px',
                fontWeight: '600',
                color: "red"
            },
            iconStyle: {
                fontSize: '20px',
                fontWeight: '600',
                verticalAlign: 'bottom',
                marginRight: '8px'
            },
        }
        const reasons = [
            'Telefon numarası kullanımda.',
            'TCKN kullanımda',
            'E-Mail Adresi kullanımda'
        ];
        return (
            <div>
                <Row>
                    <Col span={12} offset={1}>
                        <span style={styles.pNormalStyle}>{name.value}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={1}>
                        <Icon style={styles.iconStyle} type="warning" theme="twoTone" twoToneColor={"#f4bf42"} />
                        <span style={styles.pSubStyle}>{reasons[reason - 1]}</span>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={19}>
                        <p style={phoneNumber.matched ? styles.pNormalStyle : styles.pChangedStyle}>
                            <span style={{ width: '250px', display: 'inline-block' }}>Telefon Numarası:</span>
                            <span style={{ fontSize: '16x', fontWeight: '400', marginLeft: '10px' }}>{phoneNumber.value}</span>
                        </p>
                    </Col>
                    <Col span={5}>
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    this.setState({
                                        phonenumberoverride: true
                                    })
                                } else {
                                    this.setState({
                                        phonenumberoverride: false
                                    })
                                }
                            }}
                        >
                            <span style={{ fontSize: '12x', fontWeight: '500' }}>Onayla</span>
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={19}>
                        <p style={tckn.matched ? styles.pNormalStyle : styles.pChangedStyle}>
                            <span style={{ width: '250px', display: 'inline-block' }}>TCKN: </span>
                            <span style={{ fontSize: '16x', fontWeight: '400', marginLeft: '10px' }}>{tckn.value}</span>
                        </p>
                    </Col>
                    <Col span={5}>
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    this.setState({
                                        tcknoverride: true
                                    })
                                } else {
                                    this.setState({
                                        tcknoverride: false
                                    })
                                }
                            }}
                        >
                            <span style={{ fontSize: '12x', fontWeight: '500' }}>Onayla</span>
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={19}>
                        <p style={email.matched ? styles.pNormalStyle : styles.pChangedStyle}>
                            <span style={{ width: '250px', display: 'inline-block' }}>E-Mail: </span>
                            <span style={{ fontSize: '16x', fontWeight: '400', marginLeft: '10px' }}>{email.value}</span>
                        </p>
                    </Col>
                    <Col span={5}>
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    this.setState({
                                        emailoverride: true
                                    })
                                } else {
                                    this.setState({
                                        emailoverride: false
                                    })
                                }
                            }}
                        >
                            <span style={{ fontSize: '12x', fontWeight: '500' }}>
                                Onayla
                                </span>
                        </Checkbox>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        const { phonenumberoverride , emailoverride , tcknoverride } = this.state;
        const { parents, visible } = this.props;
        const parentRows = parents && parents.map((parent) => {
            return this.renderParentRow(parent)
        })
        return (
            <div>
                <Modal
                    visible={visible}
                    title={"Veli Bilgileri Onay Kutusu"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                    style={{ top: 40 }}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Geri</Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={this.handleOk}
                            disabled={!phonenumberoverride || !emailoverride || !tcknoverride}
                        >
                            Onayla
                        </Button>,
                    ]}
                >
                    {parentRows}
                </Modal>
            </div>
        );
    }
}