import React , {Component} from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import AddSysreqForm from './AddSysreqForm';

const WrappedAddSysreqForm = Form.create()(AddSysreqForm);

class AddModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){

    }

    render(){
        const styles = {
            modal : {
                minWidth : '70%'
            }
        }
        return(
            <Row>
                <Col span={24}>
                    <Modal
                        title="Yeni Sistem Talebi Oluştur"
                        wrapClassName="vertical-center-modal"
                        visible={this.props.visible}
                        onOk={this.props.onOK}
                        onCancel={this.props.onCancel}
                        style={styles.modal}
                        destroyOnClose={true}
                    >
                        <WrappedAddSysreqForm 
                            queues={this.props.queues}
                            onRegisterOK={this.props.onRegisterOK}
                            onRegisterFail={this.props.onRegisterFail}
                        />
                    </Modal>
                </Col>
            </Row>
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

const connectedAddModal = connect(mapStateToProps)(AddModal);

export default connectedAddModal;