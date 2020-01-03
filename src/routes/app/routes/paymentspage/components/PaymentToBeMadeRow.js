import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Select, InputNumber, Button, Icon } from 'antd';
import ContractsNetworkAdapter from '../../../../../services/network/ContractsNetworkAdapter';
import FileBrowserComponent from './FileBrowserComponent';

const Option = Select.Option;

const METHODS = [
    { id: 0, name: "CASH" },
    { id: 1, name: "CREDITCARD" },
    { id: 2, name: "MAILORDER" },
    { id: 3, name: "DEBITCARD" },
    { id: 4, name: "CHECK" },
    { id: 5, name: "ONLINE" },
    { id: 6, name: "EXTERNAL" },
    { id: 7, name: "EFT" },
];

const METHODSSTRTR = [
    "NAKİT",
    "KREDİ KARTI",
    "MAIL ORDER",
    "BANKA KARTI",
    "ÇEK/SENET",
    "ONLINE",
    "HARİCİ ÖDEME YÖNTEMLERİ",
    "EFT"
];

const TYPES = [
    {
        id: 0,
        name: "FULL"
    }, {
        id: 1,
        name: "INSTALLMENTS"
    }, {
        id: 3,
        name: "POSTPONED"
    }
];

const TYPESSTRTR = [
    "PEŞİN",
    "TAKSİTLİ",
    "ERTELENMİŞ"
];

const initialState = {
    selectedMethod: undefined,
    selectedType: undefined,
    selectedBank: undefined,
    installmentenabled: false,
    installments: 0,
    amount: 0,
    documentuid: undefined,
    sent: false,
    documentsadded: []
};

class PaymentToBeMadeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    componentDidMount() {
        this.contractNetworkApi = new ContractsNetworkAdapter(this.props.user.user);
    }

    handlePayment = () => {
        var payment = {};
        payment.method = this.state.selectedMethod;
        payment.type = this.state.selectedType;
        payment.installments = this.state.installments;
        payment.documentuid = this.state.documentuid;
        payment.amount = {
            amount: this.state.amount,
            currency: "TRY"
        };
        payment.bank = {
            id: this.state.selectedBank
        }
        payment.attachments = this.props.files && this.props.files.filter((file) => {
            if(file.selected){
                return true;
            }
            return false;
        });
        this.contractNetworkApi.createPaymentForCurrentAccount(this.props.id, payment)
            .then((result) => {
                this.setState({
                    sent: true
                })
            })
            .catch((err) => {
                this.setState({
                    sent: false
                })
            })
    }

    handleItemRemoved = (file) => {
        file.selected = false;
        this.setState({});
    }

    onBankSelected = (selectedBank) => {
        this.setState({ selectedBank })
    }

    onMethodSelected = (value) => {
        this.setState({
            selectedMethod: value
        })
    }

    onTypeSelected = (value) => {
        if (value == "INSTALLMENTS") {
            this.setState({
                selectedType: value,
                installmentenabled: true
            })
        } else {
            this.setState({
                selectedType: value
            })
        }

    }

    render() {
        const { id, accountholder, studentname, banks, files } = this.props;
        const { sent } = this.state;

        const methodsMap = METHODS.map((method) => {
            return <Option key={method.id} value={method.name}>{METHODSSTRTR[method.id]}</Option>
        });

        const typesMap = TYPES.map((type) => {
            return <Option key={type.id} value={type.name}>{TYPESSTRTR[type.id]}</Option>
        });

        const banksMap = banks && banks.map((bank) => {
            return <Option key={bank.id} value={bank.id}>{bank.name}</Option>
        });

        const filesMap = files && files.map((file) => {
            return <Option
                key={file.id}
                value={file.id}
            >
                {file.note}
            </Option>
        })

        const styles = {
            textStyle: {
                flex: 1,
                padding: '8px',
                fontSize: '18px',
                fontWeight: '500'
            },
            headerTextStyle: {
                flex: 1,
                padding: '8px',
                fontSize: '24px',
                fontWeight: '500'
            },
            colContainerStyle: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        };

        return (
            <Row>
                <Col style={{
                    marginTop: '12px',
                    marginBottom: '12px',
                    padding: '24px',
                    border: '2px solid gray'
                }} span={18} offset={3}>
                    <Row style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }} span={24}>
                            <div style={styles.headerTextStyle}>
                                {studentname} TAHSİLAT
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row style={{
                                padding: '32px',
                                margin: '12px'
                            }} gutter={8}>
                                <Col span={24}>
                                    <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Ödeme Yöntemi
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <Select
                                                disabled={sent}
                                                style={{ width: '100%' }}
                                                onSelect={this.onMethodSelected}
                                                value={this.state.selectedMethod}
                                            >
                                                {methodsMap}
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Ödeme Şekli
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <Select
                                                style={{ width: '100%' }}
                                                onSelect={this.onTypeSelected}
                                                disabled={sent}
                                                value={this.state.selectedType}
                                            >
                                                {typesMap}
                                            </Select>
                                        </Col>
                                    </Row>
                                    {this.state.installmentenabled && <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Taksit
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <InputNumber
                                                min={0}
                                                max={9}
                                                disabled={sent}
                                                value={this.state.installments}
                                                onChange={(installments) => {
                                                    this.setState({
                                                        installments
                                                    })
                                                }}
                                            />
                                        </Col>
                                    </Row>}
                                    <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Banka
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <Select
                                                style={{ width: '100%' }}
                                                onSelect={this.onBankSelected}
                                                disabled={sent}
                                                value={this.state.selectedBank}
                                            >
                                                {banksMap}
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Tutar
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <InputNumber
                                                value={this.state.amount}
                                                style={{
                                                    width: '100%'
                                                }}
                                                onChange={(value) => {
                                                    this.setState({
                                                        amount: parseFloat(value)
                                                    })
                                                }}
                                                disabled={sent}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Col span={8}>
                                            <div style={styles.textStyle}>
                                                Makbuz No.
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <Input
                                                value={this.state.documentuid}
                                                onChange={(e) => {
                                                    this.setState({
                                                        documentuid: e.target.value
                                                    })
                                                }}
                                                disabled={sent}
                                            />
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row style={{
                                padding: '32px',
                                margin: '12px'
                            }}>
                                <Col span={18}>
                                    <div style={styles.textStyle}>
                                        Dokumanlar
                                    </div>
                                    <Select
                                        showSearch
                                        onSearch={(e) => {

                                        }}
                                        onSelect={(e) => {
                                            for (var i = 0; i < this.props.files.length; i++) {
                                                if (e == this.props.files[i].id) {
                                                    this.props.files[i].selected = true;
                                                    this.setState({});
                                                }
                                            }
                                        }}
                                        mode={"multiple"}
                                        onDeselect={(e) => {
                                            for (var i = 0; i < this.props.files.length; i++) {
                                                if (e == this.props.files[i].id) {
                                                    this.props.files[i].selected = false;
                                                    this.setState({});
                                                }
                                            }
                                        }}
                                        allowClear={true}
                                        style={{
                                            width: '100%'
                                        }}
                                        disabled={sent}
                                    >
                                        {filesMap}
                                    </Select>
                                    <FileBrowserComponent
                                        files={this.props.files}
                                        onItemRemoved={this.handleItemRemoved}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '48px'
                    }}>
                        <Col span={10}>
                            {!this.state.sent ?
                                <Row>
                                    <Col>
                                        <Button
                                            type={"primary"}
                                            block={true}
                                            icon="cloud"
                                            style={{
                                                height: '64px'
                                            }}
                                            onClick={(e) => {
                                                this.handlePayment()
                                            }}
                                            disabled={sent}
                                        >
                                            GÖNDER
                                                </Button>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col>
                                        <Button
                                            type={"primary"}
                                            block={true}
                                            icon="check"
                                            style={{
                                                height: '64px',
                                                backgroundColor: 'green'
                                            }}
                                            onClick={(e) => {
                                                this.setState({
                                                    ...initialState
                                                })
                                            }}
                                        >
                                            YENİLE
                                            </Button>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedPaymentToBeMadeRow = connect(mapStateToProps)(PaymentToBeMadeRow);

export default connectedPaymentToBeMadeRow;