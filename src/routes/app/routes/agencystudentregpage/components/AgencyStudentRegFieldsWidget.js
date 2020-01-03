import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Checkbox, Spin, notification } from 'antd';
import { connect } from 'react-redux';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';
import R from '../config/R';

const FormItem = Form.Item;

import OverrideModal from './OverrideModal';
import AgencyStudentRegParentForm from './AgencyStudentRegParentForm';
import AgencyStudentRegStudentForm from './AgencyStudentRegStudentForm';
import StudentRegistrationNetworkAdapter from 'services/network/StudentRegistrationNetworkAdapter';

const initialstate = {
    parents: [
        {
            index: 0
        }
    ],
    students: [
        {
            index: 0
        }
    ],
    loading: false,
    overriding: false,
    overrideParents: [],
    form : undefined
}

class AgencyStudentRegFieldsWidget extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
        this.addNewParent = this.addNewParent.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.handleOnParentDeleted = this.handleOnParentDeleted.bind(this);
        this.handleOnStudentDeleted = this.handleOnStudentDeleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onOverrideOk = this.onOverrideOk.bind(this);
        this.onOverrideCancel = this.onOverrideCancel.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    }

    componentDidMount() {
        this.studentRegistrationAdapter = new StudentRegistrationNetworkAdapter(this.props.user.user);
    }

    addNewParent() {
        this.state.parents.push({ index : JSON.parse(JSON.stringify(this.state.parents.length)) });
        this.setState({ parents: this.state.parents });
    }

    addNewStudent() {
        this.state.students.push({ index: this.state.students.length });
        this.setState({ students: this.state.students });
        this.props.onStudentAdded(this.state.students.length - 1)
    }

    findParentWithIndex(index) {

    }

    handleOnParentDeleted(index) {
        for (var i = 0; i < this.state.parents.length; i++) {
            if (this.state.parents[i].index == index) {
                this.state.parents.splice(i, 1);
                this.setState({ parents: this.state.parents });
            }
        }
    }

    handleOnStudentDeleted(index) {
        for (var i = 0; i < this.state.students.length; i++) {
            if (this.state.students[i].index == index) {
                this.state.students.splice(i, 1);

            }
        }
        for (var i = 0; i < this.state.students.length; i++) {
            this.state.students[i].index = i;
        }
        this.setState({ students: this.state.students });
        this.props.onStudentDeleted(index);
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Öğrenci Ekleme',
            description: message,
            duration: 10
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(function(err, values){
            if (!err) {
                if (values.agreement) {
                    var form = {};                    
                    form.parents = [];
                    for (var i = 0; i < this.state.parents.length; i++) {
                        let parent = {};
                        if(this.state.corporate){
                            form.accounttype = "CORPORATE";
                            form.identifier = { 
                                tckn : values['parent0trid'],
                                taxno : values['parent' + i + 'taxno'],
                                taxoffice : values['parent' + i + 'taxoffice'],
                                companytitle : values['parent' + i + 'companytitle'],
                            }
                        } else {
                            form.accounttype = "PERSONAL";
                            form.identifier = { 
                                tckn : values['parent0trid'] 
                            }
                        }

                        parent.email = values['parent' + i + 'email'];
                        parent.name = values['parent' + i + 'fullname'];
                        parent.phoneNumber = values['parent' + i + 'phone'];
                        parent.tckn = values['parent' + i + 'trid'];
                        form.parents.push(parent);
                    }
                    form.students = [];
                    for (var o = 0; o < this.state.students.length; o++) {
                        
                        let student = {};
                        student.name = values['student' + o + 'fullname'];
                        student.grade = values['student' + o + 'grade'];
                        student.gender = values['student' + o + 'gender'];
                        student.cutby = parseFloat(values['student' + o + 'cutby']);
                        student.cutbyexp = values['student' + o + 'cutbyexp'];
                        student.schoolid = values['student' + o + 'schoolid'];
                        student.morningLocation = {};
                        student.morningLocation.lat = values['student' + o + "morningloclat"];
                        student.morningLocation.lng = values['student' + o + "morningloclng"];
                        student.eveningLocation = {};
                        student.eveningLocation.lat = values['student' + o + "eveningloclat"];
                        student.eveningLocation.lng = values['student' + o + "eveningloclng"];
                        student.morningNotifee = values['student' + o + 'morningnotifee'];
                        student.eveningNotifee = values['student' + o + 'eveningnotifee'];
                        student.morningNotificationType = values['student' + o + 'morningnotificationtype'];
                        student.eveningNotificationType = values['student' + o + 'eveningnotificationtype'];
                        student.discounts = [];
                        var discounts = values['student' + o + 'discount'];
                        for(var m = 0; m < discounts.length ; m++){
                            student.discounts.push({
                                id : discounts[m]
                            });
                        }
                        for(var i = 0; i < this.props.pricingpolicies.length ; i++){
                            if(this.props.pricingpolicies[i].id == values['student' + o + 'pricingpolicy'].key){
                                student.pricingpolicy = {
                                    id : this.props.pricingpolicies[i].id
                                }
                            }
                        }
                        for(var i = 0; i < this.props.districts.length ; i++){
                            if(this.props.districts[i].name == values['student' + o + 'district']){
                                student.district = {
                                    id : this.props.districts[i].id
                                }
                            }
                        }
                        
                        form.students.push(student);
                        this.setState({ loading: true });
                        this.studentRegistrationAdapter.registerStudents(form)
                            .then(function (result) {
                                this.setState({ loading: false });
                                let response = result.data;
                                if (response.response == "301") {
                                    let oOverrideParents = [];
                                    for (var l = 0; l < response.results.length; l++) {
                                        let overrideParent = response.results[l].targetparent;
                                        let overrideData = {};
                                        overrideData.phoneNumber = {};
                                        overrideData.phoneNumber.value = overrideParent.phoneNumber;
                                        if (l == 0) {
                                            overrideData.phoneNumber.matched = form.parents[0].phoneNumber == overrideParent.phoneNumber;
                                        } else {
                                            overrideData.phoneNumber.matched = form.parents[1].phoneNumber == overrideParent.phoneNumber;
                                        }
                                        overrideData.tckn = {};
                                        overrideData.tckn.value = overrideParent.tckn;
                                        if (l == 0) {
                                            overrideData.tckn.matched = form.parents[0].tckn == overrideParent.tckn;
                                        } else {
                                            overrideData.tckn.matched = form.parents[1].tckn == overrideParent.tckn;
                                        }
                                        overrideData.email = {};
                                        overrideData.email.value = overrideParent.email;
                                        if (l == 0) {
                                            overrideData.email.matched = form.parents[0].email == overrideParent.email;
                                        } else {
                                            overrideData.email.matched = form.parents[1].email == overrideParent.email;
                                        }
                                        overrideData.name = {};
                                        overrideData.name.value = overrideParent.name;
                                        if (l == 0) {
                                            overrideData.name.matched = form.parents[0].name == overrideParent.name;
                                        } else {
                                            overrideData.name.matched = form.parents[1].name == overrideParent.name;
                                        }
                                        overrideData.reason = response.results[l].code;
                                        oOverrideParents.push(overrideData);
                                    }
                                    this.setState({
                                        form : form,
                                        overriding: true,
                                        overrideParents: oOverrideParents
                                    })
                                } else {
                                    this.openNotificationWithIcon('success', "Kayıt başarılı.");
                                    this.setState(...initialstate);
                                }
                            }.bind(this))
                            .catch(function (error) {
                                console.error(error);
                                this.setState({ loading: false });
                            }.bind(this))
                    }
                } else {

                }
            }
        }.bind(this));
    }

    onOverrideOk() {
        for(var i = 0; i < this.state.form.parents.length;i++){
            this.state.form.parents[i].override = true;
        }
        this.studentRegistrationAdapter.registerStudents(this.state.form)
        .then((result) => {
            if(result.data.response == 200){
                this.openNotificationWithIcon('success', "Kayıt başarılı.");
                this.setState(...initialstate);
                setTimeout(function(e){
                    window.location.reload();
                },2000);
            } else {
                this.openNotificationWithIcon('fail', "Kayıt Başarısız. Sistem Yöneticisi İle İletişime Geçin");
            }
        })
        .catch((error) => {
            this.openNotificationWithIcon('fail', "Kayıt Başarısız. Sistem Yöneticisi İle İletişime Geçin");
        })
    }

    onOverrideCancel() {
        this.setState({
            overriding: false
        })
    }

    handleParentNameChanged(value) {
        this.props.handleParentNameChanged(value);
    }

    handleParentAddressChanged(value) {
        this.props.handleParentAddressChanged(value);
    }


    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
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
                    offset: 3,
                },
            },
        };
        this.state.parents.sort((a , b) => {
            if(a.index < b.index){
                return -1;
            } else if(a.index > b.index){
                return 1;
            }
            return 0;
        })
        const parentsMap = this.state.parents.map((e) => {
            return <AgencyStudentRegParentForm
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                key={e.index}
                index={e.index}
                onParentDeleted={this.handleOnParentDeleted}
                onParentNameChanged={this.props.onParentNameChanged}
                onParentAddressSelected={this.props.onParentAddressSelected}
                onCorporateChecked={(value) => {
                    this.setState({
                        corporate  : value
                    })
                }}
            />
        });
        const addNewParentDisabled = (parentsMap.length > 1 ? true : false);
        const studentsMap = this.state.students.map((e) => {
            return <AgencyStudentRegStudentForm
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                key={e.index}
                index={e.index}
                onStudentDeleted={this.handleOnStudentDeleted}
                contract={this.props.contract}
                pricingpolicies={this.props.pricingpolicies}
                districts={this.props.districts}
                discounts={this.props.discounts}
                onDiscountChecked={this.props.onDiscountChecked}
                onDistrictSelected={this.props.onDistrictSelected}
                onGradeSelected={this.props.onGradeSelected}
                onPricingpolicySelected={this.props.onPricingpolicySelected}
                onCutByChanged={this.props.onCutByChanged}
                onCutByExpChanged={this.props.onCutByExpChanged}
            />
        });
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <Row style={{ paddingBottom: '80px' }}>
                        <Col span={24}>
                            <Form >
                                <Row>
                                    <Col offset={1} style={{ marginTop: '10px' }}>
                                        <span style={{ padding: '10px 5px', fontSize: '18px', fontWeight: '500' }}>VELİ BİLGİLERİ</span>
                                    </Col>
                                </Row>
                                {parentsMap}
                                <Row>
                                    <Col offset={4} span={4}>
                                        <Button type="primary" disabled={addNewParentDisabled} icon="plus-circle" block={true} onClick={this.addNewParent}>Yeni Veli Ekle</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1} style={{ marginTop: '10px' }}>
                                        <span style={{ padding: '10px 5px', fontSize: '18px', fontWeight: '500' }}>ÖĞRENCİ BİLGİLERİ</span>
                                    </Col>
                                </Row>
                                {studentsMap}
                                <Row>
                                    <Col offset={4} span={4}>
                                        <Button type="primary" icon="plus-circle" block={true} onClick={this.addNewStudent}>Yeni Öğrenci Ekle</Button>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '30px' }}>
                                    <Col>
                                        <Form.Item {...tailFormItemLayout}>
                                            {getFieldDecorator('agreement', {
                                                valuePropName: 'checked',
                                            })(
                                                <Checkbox><a href="">Sözleşmeyi</a> okuduğumu ve anladığımı beyan ederim.</Checkbox>
                                            )}
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            <Button type="primary" onClick={this.handleSubmit}>ÖĞRENCİYİ KAYDET</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Spin>

                <OverrideModal
                    visible={this.state.overriding}
                    onOk={this.onOverrideOk}
                    onCancel={this.onOverrideCancel}
                    parents={this.state.overrideParents}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAgencyStudentRegFieldsWidget = connect(mapStateToProps)(AgencyStudentRegFieldsWidget);

export default connectedAgencyStudentRegFieldsWidget;

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