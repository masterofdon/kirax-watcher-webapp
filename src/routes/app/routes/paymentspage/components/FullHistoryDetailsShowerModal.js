import React from 'react';
import { Row, Col, Modal, Button, Timeline, Icon, Spin, Collapse } from 'antd';
import { timeservice } from '../../../_services/timeutil.service';
import ImageGallery from './ImageGallery';

const { Panel } = Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    fontSize: '20px',
    fontWeight: '600'
};

export default class FullHistoryDetailsShowerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedhistory: undefined,
            selectedpayment: undefined
        }
    }

    componentWillUnmount() {
        this.state.selectedpayment = undefined;
    }

    renderPaymentTimelineItem = (history) => {
        var actions = history.action.split(";");
        var logs = [];
        var amount = 0;
        var pid = undefined;
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i].split(":")[0];
            var value = actions[i].split(":")[1];
            if (key == "amount") {
                amount = value;
            } else if (key == "pid") {
                pid = value;
            }
        }
        return (
            <Timeline.Item
                dot={
                    <Button
                        shape={'circle'}
                        style={{
                            border: 'none'
                        }}
                        onClick={(e) => {
                            this.props.histories.map((f1) => {
                                f1.selected = false;
                            });

                            history.selected = true;

                            for (var i = 0; i < this.props.currentaccount.payments.length; i++) {
                                if (this.props.currentaccount.payments[i].id == pid) {
                                    this.props.onPaymentSelected(pid);
                                    return;
                                }
                            }
                        }}>
                        <Icon type="dollar" style={{
                            fontSize: history.selected ? '36px' : '28px',
                            color: history.selected ? 'green' : '#d9d9d9'
                        }} />
                    </Button>
                }
            >
                <Row>
                    <Col style={{
                        marginLeft: '24px',
                        marginRight: '24px'
                    }}>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '400',
                        }}>
                            {"TAHSİLAT ALINDI: " + amount + " TL"}
                        </span>
                        <br />
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '400',
                        }}>
                            {timeservice.convertToDateNoTime(history.lastModifiedDate, "/")}
                        </span>
                    </Col>
                </Row>
            </Timeline.Item>
        );
    }

    renderCreationTimelineItem = (history) => {

        return (
            <Timeline.Item >
                <span style={{
                    fontSize: '16px',
                    fontWeight: '400',
                }}>
                    {history.action}
                </span>
                <br />
                <span style={{
                    fontSize: '14px',
                    fontWeight: '400',
                }}>
                    {timeservice.convertToDateNoTime(history.lastModifiedDate, "/")}
                </span>
            </Timeline.Item>
        );
    }

    render() {
        const { currentaccount, visible, histories, loading , selectedpayment} = this.props;
        var hists = (histories || []);
        hists.sort((a, b) => {
            if (a.lastModifiedDate < b.lastModifiedDate) {
                return -1;
            } else if (a.lastModifiedDate > b.lastModifiedDate) {
                return 1;
            }
            return 0;
        });
        const historiesMap = hists.map((history) => {
            switch (history.actiontype) {
                case "CURRENT_ACCOUNT_REGISTRATION_BY_AGENCYREP":
                    return this.renderCreationTimelineItem(history);
                case "CURRENT_ACCOUNT_PAYMENT_BY_AGENCYREP":
                    return this.renderPaymentTimelineItem(history);
                default:
                    return this.renderCreationTimelineItem(histroy)
            }
        });
        return (
            <Row >
                <Col>
                    <Modal
                        title={(currentaccount && currentaccount.accountholder.parent.name + " / " + currentaccount.name) || "DETAYLAR"}
                        style={{ top: 40 }}
                        visible={visible}
                        onOk={() => this.props.onOKClicked()}
                        onCancel={() => this.props.onCancelClicked()}
                        destroyOnClose={true}
                        width={800}
                    >
                        <Spin spinning={loading}>
                            <Row style={{
                                padding: '48px',
                            }}>
                                <Col>
                                    <Timeline mode="alternate">
                                        {historiesMap.length > 0 ?
                                            historiesMap :
                                            <Row>
                                                <Col
                                                    style={{
                                                        fontSize: '22px',
                                                        fontWeight: '400',
                                                        color: '#888'
                                                    }}
                                                    span={12}
                                                    offset={6}
                                                >
                                                    GEÇMİŞ BİLGİSİ BULUNAMADI
                                                </Col>
                                            </Row>
                                        }
                                    </Timeline>
                                </Col>
                            </Row>
                            <Row style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Col span={24}>
                                    <Collapse
                                        bordered={false}
                                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                    >
                                        <Panel header="DÖKÜMANLAR" key="1" style={customPanelStyle}>
                                            {selectedpayment && <ImageGallery
                                                attachments={selectedpayment.attachments}
                                            />}
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </Spin>
                    </Modal>
                </Col>
            </Row>
        );
    }
}