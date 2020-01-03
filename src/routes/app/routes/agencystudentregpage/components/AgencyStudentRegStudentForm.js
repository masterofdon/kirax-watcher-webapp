import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Checkbox, InputNumber } from 'antd';
import { connect } from 'react-redux';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import R from '../config/R';

const FormItem = Form.Item;
const Option = Select.Option;

import { compose, withProps, mapProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import GoogleMapsPlacesSearchAutocomplete from './GoogleMapsPlacesSearchAutocomplete';
import SchoolsNetworkAdapter from 'services/network/SchoolsNetworkAdapter';

const MapNoMarker = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBuqrIh4l9CH2Uq6ATnIwMu-Fa9z8GrDJE",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        onDblClick={props.onDblClick}
        onClick={props.onClick}
        options={{ disableDefaultUI: true }}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={props.zoom}
        getCenter={props.getCenter}
    >
        {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
        {props.children}
    </GoogleMap>
);

class AgencyStudentRegStudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentName: null,
            studentGrade: "1",
            selectedSchool: null,
            schoolid: null,
            selectedLoc: {
                lat: 36.881143,
                lng: 30.637751
            },
            zoom: 13,
            morningLoc: null,
            eveningLoc: null,
            morningNotifee: "primary",
            eveningNotifee: "primary",
            morningNotificationType: "SMS",
            eveningNotificationType: "SMS",
            studentNumber: null,
            morningSelectionEnabled: false,
            eveningSelectionEnabled: false,
            selectedDiscounts: [],
        }
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleParentNameChanged = this.handleParentNameChanged.bind(this);
        this.handleParentNameChanged = this.handleParentNameChanged.bind(this);
        this.handleRemoveParent = this.handleRemoveParent.bind(this);
        this.handleSchoolGradeChange = this.handleSchoolGradeChange.bind(this);
        this.selectEveningLocation = this.selectEveningLocation.bind(this);
        this.selectMorningLocation = this.selectMorningLocation.bind(this);
        this.onAddressSelected = this.onAddressSelected.bind(this);
        this.onSearchSchoolForRegister = this.onSearchSchoolForRegister.bind(this);
        this.handlePricingPolicySelected = this.handlePricingPolicySelected.bind(this);
        this.onStudentSchoolIdChange = this.onStudentSchoolIdChange.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onMorningNotifeeChanged = this.onMorningNotifeeChanged.bind(this);
        this.onEveningNotifeeChanged = this.onMorningNotifeeChanged.bind(this);
        this.onMorningNotificationTypeChanged = this.onMorningNotificationTypeChanged.bind(this);
        this.onEveningNotificationTypeChanged = this.onMorningNotificationTypeChanged.bind(this);
        this.onGenderSelectionChange = this.onGenderSelectionChange.bind(this);
        this.handleStudentDistrictChange = this.handleStudentDistrictChange.bind(this);
    }

    componentDidMount() {
        this.props.setFieldsValue({ ['student' + this.props.index + 'grade']: this.state.studentGrade });
        this.props.setFieldsValue({ ['student' + this.props.index + 'gender']: this.state.studentGender });
        this.props.setFieldsValue({ ['student' + this.props.index + 'morningnotifee']: this.state.morningNotifee });
        this.props.setFieldsValue({ ['student' + this.props.index + 'eveningnotifee']: this.state.eveningNotifee });
        this.props.setFieldsValue({ ['student' + this.props.index + 'morningnotificationtype']: this.state.morningNotificationType });
        this.props.setFieldsValue({ ['student' + this.props.index + 'eveningnotificationtype']: this.state.eveningNotificationType });
    }

    handleRemoveParent() {
        this.props.onStudentDeleted(this.props.index);
    }

    handleParentEmailChange = (event) => {
        this.setState({ parentEmail: event.target.value });
    }

    handleParentNameChanged = (event) => {
        this.setState({ parentName: event.target.value });
    }

    handleNumberChange = (value) => {
        this.setState({
            tcknStatus: {
                ...validateTCKN(value.target),
                value,
            },
        });
    }

    handleSchoolGradeChange(value) {
        this.setState({ studentGrade: value });
        this.props.onGradeSelected(value , this.props.index)
    }

    handlePricingPolicySelected = (item) => {
        if (this.props.pricingpolicies) {
            for (var i = 0; i < this.props.pricingpolicies.length; i++) {
                if (this.props.pricingpolicies[i].id == item.key) {
                    this.setState({
                        selectedPolicy: this.props.pricingpolicies[i]
                    })
                    this.props.onPricingpolicySelected(this.props.pricingpolicies[i] , this.props.index)
                }
            }
        }

    }

    handleStudentDistrictChange(value, item) {
        console.log(value, item.key);
        for (var i = 0; i < this.props.districts.length; i++) {
            if (this.props.districts[i].id == item.key) {
                this.props.setFieldsValue({ ['student' + this.props.index + 'district']: this.props.districts[i] })
            }
        }
        this.setState({
            selectedDistrict: value
        })
        this.props.onDistrictSelected(item.key , this.props.index)
    }

    handleDiscountChecked = (values) => {
        var { selectedDiscounts } = this.state;
        selectedDiscounts = [];
        for(var i = 0; i < values.length;i++){
            selectedDiscounts.push(values[i])
        }
        this.setState({
            selectedDiscounts
        })
        this.props.onDiscountChecked(selectedDiscounts , this.props.index);
    }

    onMapsDoubleClicked(item) {
        if (this.state.morningSelectionEnabled) {
            this.props.setFieldsValue({ ['student' + this.props.index + 'morningloclat']: item.latLng.lat() });
            this.props.setFieldsValue({ ['student' + this.props.index + 'morningloclng']: item.latLng.lng() });
            this.state.morningLoc = {};
            this.state.morningLoc.lat = item.latLng.lat();
            this.state.morningLoc.lng = item.latLng.lng();
            this.setState({ morningSelectionEnabled: false, morningLoc: this.state.morningLoc });
        } else if (this.state.eveningSelectionEnabled) {
            this.props.setFieldsValue({ ['student' + this.props.index + 'eveningloclat']: item.latLng.lat() });
            this.props.setFieldsValue({ ['student' + this.props.index + 'eveningloclng']: item.latLng.lng() });
            this.state.eveningLoc = {};
            this.state.eveningLoc.lat = item.latLng.lat();
            this.state.eveningLoc.lng = item.latLng.lng();
            this.setState({ eveningSelectionEnabled: false, eveningLoc: this.state.eveningLoc });
        }
    }

    onGenderSelectionChange() {
        this.setState({});
    }

    onNameChanged(studentName) {
        this.setState({ studentName })
    }

    onStudentSchoolIdChange(schoolid) {
        this.setState({ schoolid });
    }

    onCutByChanged = (cutby) => {
        this.setState({ cutby });
        this.props.onCutByChanged(cutby , this.props.index)
    }

    onCutByExpChanged = (exp) => {
        this.setState({ exp });
        this.props.onCutByExpChanged(exp)
    }

    onSearchSchoolForRegister(item) {
        this.schoolsAdapter.querySchools(item)
            .then(function (e) {
                this.setState({
                    schools: e.data.content
                })
            }.bind(this))
    }



    onAddressSelected(latLng) {
        this.setState({
            selectedLoc: latLng,
            zoom: 16
        })
    }

    onMorningNotifeeChanged(morningNotifee) {
        console.log(`selected ${morningNotifee}`);
        this.setState({ morningNotifee })
    }

    onEveningNotifeeChanged(eveningNotifee) {
        console.log(`selected ${eveningNotifee}`);
        this.setState({ eveningNotifee })
    }

    onMorningNotificationTypeChanged(morningNotificationType) {
        console.log(`selected ${morningNotificationType}`);
        this.setState({ morningNotificationType })
    }

    onEveningNotificationTypeChanged(eveningNotificationType) {
        console.log(`selected ${eveningNotificationType}`);
        this.setState({ eveningNotificationType })
    }

    selectMorningLocation() {
        if (this.state.eveningSelectionEnabled) {
            this.setState({
                eveningSelectionEnabled: false,
                morningSelectionEnabled: true
            })
        } else if (this.state.morningSelectionEnabled) {
            this.setState({
                morningSelectionEnabled: false
            })
        } else {
            this.setState({
                morningSelectionEnabled: true
            })
        }
    }

    selectEveningLocation() {
        if (this.state.morningSelectionEnabled) {
            this.setState({
                eveningSelectionEnabled: true,
                morningSelectionEnabled: false
            })
        } else if (this.state.eveningSelectionEnabled) {
            this.setState({
                eveningSelectionEnabled: false
            })
        } else {
            this.setState({
                eveningSelectionEnabled: true
            })
        }
    }

    render() {
        const { getFieldDecorator, index, pricingpolicies, districts, discounts, onStudentDeleted, setFieldsValue } = this.props;
        districts && districts.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        const districtsMap = districts && districts.map((e) => {
            return (
                <Option key={e.id} value={e.name}>{e.name}</Option>
            )
        });
        var pricingPoliciesMap = pricingpolicies && pricingpolicies.map((item) => {
            return <Option key={item.id} value={item.id}>{item.policyname}</Option>
        });
        var discountCheckboxOptions = discounts && discounts.map((discount) => {
            if(discount.type == "SPECIALAMOUNT"){
                return null;
            }
            return (
                {
                    label: discount.name,
                    value: discount.id
                }
            )
        });

        discountCheckboxOptions = discountCheckboxOptions.filter((e) => {
            if(e == null){
                return false
            }
            return true;
        })

        const { studentGrade } = this.state;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        var morningIcon = "/asset/images/icons/home_morning_32.png";
        const morningLocMarker = this.state.morningLoc && <Marker icon={morningIcon}
            key={"1"}
            position={{ lat: parseFloat(this.state.morningLoc.lat), lng: parseFloat(this.state.morningLoc.lng) }}
            text={'Sabah Konumu'}
            rotation={30}
        />
        var eveningIcon = "/asset/images/icons/home_evening_32.png";
        const eveningLocMarker = this.state.eveningLoc && <Marker icon={eveningIcon}
            key={"2"}
            position={{ lat: parseFloat(this.state.eveningLoc.lat), lng: parseFloat(this.state.eveningLoc.lng) }}
            text={'Aksam Konumu'}
            rotation={30}
        />
        return (
            <Row>
                <Col>
                    <Row>
                        <Col offset={2}>
                            <span style={{ fontSize: '17px', fontWeight: '600', padding: '8px' }}>{index + 1}. Öğrenci</span>
                        </Col>
                    </Row>
                    <Row type={'flex'}>
                        <Col offset={1} span={21}>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Öğrenci Ad-Soyad</span>}
                            >
                                {getFieldDecorator('student' + index + 'fullname', {
                                    rules: [{
                                        required: true, message: 'Lütfen Öğrenci Ad-Soyad giriniz.',
                                    }],
                                })(
                                    <Input onChange={this.onNameChanged} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Hizmet Adı</span>}
                            >
                                {getFieldDecorator('student' + index + 'pricingpolicy', {
                                    rules: [{
                                        required: true, message: 'Lütfen Servis Adı Seçiniz.',
                                    }],
                                })(
                                    <Select
                                        labelInValue
                                        onSelect={this.handlePricingPolicySelected}
                                    >
                                        {pricingPoliciesMap}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>İndirim</span>}
                            >
                                {getFieldDecorator('student' + index + "discount", {
                                    initialValue: [],
                                })(
                                    <Checkbox.Group
                                        options={discountCheckboxOptions}
                                        onChange={this.handleDiscountChecked} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Öğrenci Sınıfı</span>}
                            >
                                {getFieldDecorator('student' + index + 'grade', {
                                    rules: [{
                                        required: true, message: 'Lütfen Öğrenci Sınıfı giriniz.',
                                    }],
                                })(
                                    <Select onChange={this.handleSchoolGradeChange}>
                                        <Option value="0">ANA</Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                        <Option value="10">10</Option>
                                        <Option value="11">11</Option>
                                        <Option value="12">12</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Bölge</span>}
                            >
                                {getFieldDecorator('student' + index + 'district', {
                                    rules: [{
                                        required: true, message: 'Lütfen Öğrenci Bölgesini giriniz.',
                                    }],
                                })(
                                    <Select 
                                        showSearch
                                        onChange={this.handleStudentDistrictChange}>
                                        {districtsMap}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Özel İndirim</span>}
                            >
                                {getFieldDecorator('student' + index + 'cutby', {})(
                                    <InputNumber style={{ width : '100%'}} onChange={this.onCutByChanged} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Özel İndirim Açıklaması</span>}
                            >
                                {getFieldDecorator('student' + index + 'cutbyexp', {})(
                                    <Input style={{ width : '100%'}} onChange={(e) => {this.onCutByExpChanged(e.target.value)}} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Öğrenci Okul Numarası</span>}
                            >
                                {getFieldDecorator('student' + index + 'schoolid', {
                                    rules: [{}],
                                })(
                                    <Input onChange={this.onStudentSchoolIdChange} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Cinsiyet</span>}
                            >
                                {getFieldDecorator('student' + index + 'gender', {
                                    rules: [{}],
                                })(
                                    <Select onChange={this.onGenderSelectionChange}>
                                        <Option value="MALE">Erkek</Option>
                                        <Option value="FEMALE">Kız</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Sabah Bildirim Velisi</span>}
                            >
                                {getFieldDecorator('student' + index + 'morningnotifee', {
                                    rules: [{}],
                                })(
                                    <Select onChange={this.onMorningNotifeeChanged}>
                                        <Option value="primary">1.Veli</Option>
                                        <Option value="secondary">2.Veli</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Akşam Bildirim Velisi</span>}
                            >
                                {getFieldDecorator('student' + index + 'eveningnotifee', {
                                    rules: [{}],
                                })(
                                    <Select onChange={this.onEveningNotifeeChanged}>
                                        <Option value="primary">1.Veli</Option>
                                        <Option value="secondary">2.Veli</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Sabah Bildirim Tipi</span>}
                            >
                                {getFieldDecorator('student' + index + 'morningnotificationtype', {
                                    rules: [{}],
                                })(
                                    <Select onChange={this.onMorningNotificationTypeChanged}>
                                        <Option value="SMS">SMS</Option>
                                        <Option value="CALL">Çağrı</Option>
                                        <Option value="INAPP">Uygulama</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Akşam Bildirim Tipi</span>}
                            >
                                {getFieldDecorator('student' + index + 'eveningnotificationtype', {
                                    rules: [{}],
                                })(
                                    <Select onChange={this.onEveningNotificationTypeChanged}>
                                        <Option value="SMS">SMS</Option>
                                        <Option value="CALL">Çağrı</Option>
                                        <Option value="INAPP">Uygulama</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Sabah Konumu</span>}
                            >
                                <Row>
                                    <Col span={6}>
                                        {getFieldDecorator('student' + index + 'morningloclat', {
                                            rules: [{
                                                required: true, message: 'Lütfen E-Posta Adresi giriniz.',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Col>
                                    <Col offset={1} span={6}>
                                        {getFieldDecorator('student' + index + 'morningloclng', {
                                            rules: [{
                                                required: true, message: 'Lütfen E-Posta Adresi giriniz.',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<span style={R.formLabelStyle}>Akşam Konumu</span>}
                            >
                                <Row>
                                    <Col span={6}>
                                        {getFieldDecorator('student' + index + 'eveningloclat', {
                                            rules: [{
                                                required: true, message: 'Lütfen Akşam Konumu giriniz.',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Col>
                                    <Col offset={1} span={6}>
                                        {getFieldDecorator('student' + index + 'eveningloclng', {
                                            rules: [{
                                                required: true, message: 'Lütfen Akşam Konumu giriniz.',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <Row>
                                <Col offset={3} span={15}>
                                    <Row>
                                        <Col>
                                            <GoogleMapsPlacesSearchAutocomplete
                                                onAddressSelected={this.onAddressSelected}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ height: '350px', width: '100%', marginBottom: "50px" }}>
                                                <MapNoMarker
                                                    onClick={this.onMapsDoubleClicked.bind(this)}
                                                    onDblClick={this.onMapsDoubleClicked.bind(this)}                                                    
                                                    lat={this.state.selectedLoc.lat}
                                                    lng={this.state.selectedLoc.lng}
                                                    ref={(map) => { this.mapRef = map }}
                                                    zoom={this.state.zoom}
                                                >
                                                    {morningLocMarker}
                                                    {eveningLocMarker}
                                                </MapNoMarker>
                                            </div>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col offset={1} span={5}>
                                    <Row>
                                        <Col>
                                            <Button
                                                type={this.state.morningSelectionEnabled ? "primary" : "secondary"}
                                                icon="arrow-left-circle"
                                                block={true} size={'large'}
                                                onClick={this.selectMorningLocation}
                                            >Sabah Konumu Seç</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '20px' }}>
                                        <Col>
                                            <Button
                                                type={this.state.eveningSelectionEnabled ? "primary" : "secondary"}
                                                icon="arrow-left-circle"
                                                block={true} size={'large'}
                                                onClick={this.selectEveningLocation}
                                            >Akşam Konumu Seç</Button>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ marginTop: 'auto', marginBottom: "auto" }} span={2}>
                            {Number(index) > 0 &&
                                <Button
                                    type="primary"
                                    icon="minus-circle"
                                    block={true} size={'large'}
                                    onClick={this.handleRemoveParent}
                                    style={{ marginLeft: '10px' }}>Sil</Button>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function validateTCKN(number) {
    var value = number.value;
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

const connectedAgencyStudentRegStudentForm = connect(mapStateToProps)(AgencyStudentRegStudentForm);

export default connectedAgencyStudentRegStudentForm;