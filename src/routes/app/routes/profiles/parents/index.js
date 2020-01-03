import React, { Component } from 'react';
import ProfileSummary from '../components/ProfileSummary';
import { Row, Col, Button , Icon,  } from 'antd';
import ParentsNetworkAdapter from 'services/network/ParentsNetworkAdapter';
import StudentsNetworkAdapter from 'services/network/StudentsNetworkAdapter';
import ProfileInteractionMap from '../components/ProfileInteractionMap';
import ProfileInteractionSummary from '../components/ProfileInteractionSummary';
import ParentSubjectStudentSummary from './components/ParentSubjectStudentSummary';
import ProfileOwnerActivities from '../components/ProfileOwnerActivities';
import { connect } from 'react-redux';

class ParentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parent : null,
            parentid : this.props.match.params.id,
            subjectStudents : []
        }
        this.getParentSubjectStudents.bind(this);
        this.getProfileOwnerDetails.bind(this);
    }

    componentDidMount(){
        this.apiAdapter = new ParentsNetworkAdapter(this.props.user.user);
        this.studentApi = new StudentsNetworkAdapter(this.props.user.user);
        this.getProfileOwnerDetails();
    }

    getProfileOwnerDetails() {
        this.apiAdapter.getParent(this.state.parentid)
            .then(function (e) {
                console.log(e);
                this.getParentSubjectStudents();
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            });
    }

    getParentSubjectStudents(){
        this.studentApi.getStudentsOfParent(this.state.parentid)
        .then(function(data){
            console.log(data);
            this.setState({
                subjectStudents : data.data
            });
        }.bind(this))
        .catch(function(error){

        }.bind(this));
        
    }

    render() {
        const style = {
            containerStyle: {
                width: '100%'
            },
            rowStyle: {
                marginTop: '10px',
                borderRadius: '5px',
                backgroundColor: 'white',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
            },
            borderlessRowStyle : {
                marginTop: '10px',
                marginBottom : '10px'
            }
        };
        const { parent , subjectStudents} = this.state;
        return (
            <div style={style.containerStyle}>
                <Row className={'profile-content'} type={'flex'} gutter={16}>
                    <Col span={4} offset={1} order={1}>
                        <Row style={style.rowStyle}>
                            <Col span={22}>
                            <ProfileSummary
                                profileowner={
                                    {
                                        name: "ERDEM EKIN",
                                        facebook: {
                                            name: "Erdem Ekin",
                                            link: "https://www.facebook.com/erdem.ekin"
                                        },
                                        phone: "905066119316",
                                        twitter: {
                                            displayName: "masterofdon",
                                            link: "https://www.twitter.com/aerdemekin"
                                        }
                                    }}
                                type={"VELİ"}
                            />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16} order={2}>
                        <Row style={style.rowStyle}>
                            <Col span={9}>
                                <Row>
                                    <Col>
                                        <ProfileInteractionMap />
                                    </Col>
                                </Row>
                                <Row>
                                    <div style={{ position : 'absolute' , top: '-80px' , left : '130px'}}>
                                        <h3 style={{color : '#3478e5'}}>Etkileşim Haritası</h3>
                                    </div>
                                </Row>
                            </Col >
                            <Col span={14}>
                                <ProfileInteractionSummary />
                            </Col>
                        </Row>
                        <Row style={style.rowStyle}>
                            <ParentSubjectStudentSummary 
                                students={subjectStudents}
                            />
                        </Row>
                        <Row style={style.rowStyle}>
                            <ProfileOwnerActivities 
                            />
                        </Row>
                        <Row style={{padding : '20px',...style.rowStyle}} >
                            <div>
                                <Col span={3} offset={3}>
                                    <Button type="primary" icon={(parent && parent.adminstatus) ? "logout" : "login"} size={'large'}>{(parent && parent.adminstatus) ? "Hesabı Dondur" : "Hesabı Etkinleştir"}</Button>
                                </Col>
                                <Col span={3} offset={3}>
                                    <Button type="danger" icon="delete" size={'large'}>Hesabı Sil</Button>
                                </Col>
                                <Col span={3} offset={3}>
                                    <Button type="primary" icon="info-circle" size={'large'}>Hesap Detayları</Button>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                </Row>
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

const connectedParentProfile = connect(mapStateToProps)(ParentProfile);

export default connectedParentProfile;