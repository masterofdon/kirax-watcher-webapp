import React, { Component } from 'react';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import R from '../config/R';
import NumericInput from './NumericInput';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const FormItem = Form.Item;
const searchOptions = {
    location: new google.maps.LatLng(36.881143, 30.637751),
    radius: 2000
}
class AgencyStudentRegParentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentName: null,
            tcknStatus: {
                value: '',
            },
            parentEmail: null,
            address: '',
            coorporate: false
        }
        this.handleTCKNChange = this.handleTCKNChange.bind(this);
        this.handleParentEmailChange = this.handleParentEmailChange.bind(this);
        this.handleParentNameChanged = this.handleParentNameChanged.bind(this);
        this.handleParentPhoneNumberChange = this.handleParentPhoneNumberChange.bind(this);
        this.handleRemoveParent = this.handleRemoveParent.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleRemoveParent() {
        this.props.onParentDeleted(this.props.index);
    }

    handleParentEmailChange = (event) => {
        this.setState({ parentEmail: event.target.value });
    }

    handleParentNameChanged = (event) => {
        this.setState({ parentName: event.target.value });
        this.props.onParentNameChanged(event.target.value);
    }

    handleTCKNChange = (e) => {
        var value = e.target.value;
        this.setState({
            tcknStatus: {
                ...validateTCKN(value),
                value,
            },
        });
    }

    handleTaxnoChange = (e) => {
        var value = e.target.value;
        this.setState({
            taxno: value
        });
    }

    handleTaxOfficeChange = (e) => {
        var value = e.target.value;
        this.setState({
            taxoffice: value
        });
    }

    handleCompanyTitleChange = (e) => {
        var value = e.target.value;
        this.setState({
            companytitle: value
        });
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleParentPhoneNumberChange(phonenumber) {
        this.setState({ phonenumber });
    }

    handleSelect = address => {
        this.props.setFieldsValue({ ['parent' + this.props.index + 'address']: this.state.address });
        this.setState({ address });
        this.props.onParentAddressSelected(address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    onCorporateChange = (e) => {
        this.setState({
            corporate: e.target.checked,
        });
        this.props.onCorporateChecked(e.target.checked);
    }

    render() {
        const { getFieldDecorator, setFieldsValue, index, onParentDeleted } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const invoicable = this.state.corporate && Number(index) == 0;
        const firstParent = new Number(index) == 0;
        return (
            <Row>
                <Col>
                    <Row>
                        <Col offset={2}>
                            <span style={{ fontSize: '17px', fontWeight: '600', padding: '8px' }}>{index + 1}. Veli</span>
                        </Col>
                    </Row>
                    <Row type={'flex'}>
                        <Col offset={1} span={20}>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Veli Telefon Numarası</span>}
                            >
                                {getFieldDecorator('parent' + index + 'phone', {
                                    rules: [{
                                        required: true, message: 'Lütfen Veli telefon numarası giriniz.',
                                    }],
                                })(
                                    <NumericInput onChange={this.handleParentPhoneNumberChange} />
                                )}
                            </FormItem>

                            {Number(index) == 0 && <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Şirket Fatura</span>}
                            >
                                {getFieldDecorator('corporate', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox onChange={this.onCorporateChange}></Checkbox>
                                )}
                            </FormItem>}
                            {invoicable && <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Vergi No</span>}
                                validateStatus={this.state.tcknStatus.validateStatus}
                                help={this.state.tcknStatus.errorMsg || "Vergi Dairesi No Şirket adına Kesilen Faturalar için zorunludur."}
                            >
                                {getFieldDecorator('parent' + index + 'taxno', {
                                    rules: [{}],
                                })(
                                    <Input onChange={this.handleTaxnoChange} />
                                )}
                            </FormItem>}
                            {invoicable && <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Vergi Daire</span>}
                                validateStatus={this.state.tcknStatus.validateStatus}
                                help={this.state.tcknStatus.errorMsg || "Vergi Dairesi Şirket adına Kesilen Faturalar için zorunludur."}
                            >
                                {getFieldDecorator('parent' + index + 'taxoffice', {
                                    rules: [{}],
                                })(
                                    <Input onChange={this.handleTaxOfficeChange} />
                                )}
                            </FormItem>}
                            {invoicable && <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Şirket Unvanı</span>}
                                help={this.state.tcknStatus.errorMsg || "Şirket unvanı şirket adına kesilen faturalar için zorunludur."}
                            >
                                {getFieldDecorator('parent' + index + 'companytitle', {
                                    rules: [{}],
                                })(
                                    <Input onChange={this.handleCompanyTitleChange} />
                                )}
                            </FormItem>}
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Veli TCKN</span>}
                                validateStatus={this.state.tcknStatus.validateStatus}
                                help={this.state.tcknStatus.errorMsg || "TCKN 11 haneli vatandaşlık numarasıdır."}
                            >
                                {getFieldDecorator('parent' + index + 'trid', {
                                    rules: [firstParent ? {
                                        required: true, message: 'Lütfen Veli TCKN giriniz.',
                                    } : {}],
                                })(
                                    <Input onChange={this.handleTCKNChange} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Veli Ad-Soyad</span>}
                            >
                                {getFieldDecorator('parent' + index + 'fullname', {
                                    rules: [firstParent ? {
                                        required: true, message: 'Lütfen Veli Veli Ad-Soyadı giriniz.',
                                    }: {}] ,
                                })(
                                    <Input onChange={this.handleParentNameChanged} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Veli Açık Adresi</span>}
                            >
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                    searchOptions={searchOptions}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Adres ara...',
                                                    className: 'ant-input',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Veli E-Posta Adresi</span>}
                            >
                                {getFieldDecorator('parent' + index + 'email', {
                                    rules: [firstParent ? {
                                        required: true, message: 'Lütfen E-Posta Adresi giriniz.',
                                    } : {}],
                                })(
                                    <Input onChange={this.handleParentEmailChange} />
                                )}
                            </FormItem>
                        </Col>
                        <Col style={{ marginTop: 'auto', marginBottom: "auto" }} span={3}>
                            {Number(index) > 0 && <Button type="primary" icon="minus-circle" block={true} size={'large'} onClick={this.handleRemoveParent} style={{ marginLeft: '10px' }}>Veli Sil</Button>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function validateTCKN(value) {
    //var value = number.value;
    var lastDigit = value.substr(value.length - 1, 1);
    let total = 0;
    for (let i = 0; i < value.length - 1; i++) {
        total += Number(value.substr(i, 1));
    }
    if (total % 10 == lastDigit && value.length == 11) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: 'TCKN düzgün girilmesi zorunludur...',
    };
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAgencyStudentRegParentForm = connect(mapStateToProps)(AgencyStudentRegParentForm);

export default connectedAgencyStudentRegParentForm;