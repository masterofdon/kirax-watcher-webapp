import React, { Component } from 'react';
import SystemRequestsNetworkAdapter from 'services/network/SystemRequestsNetworkAdapter';
import {Form , Input , Button } from 'antd';
import Comment from '../model/Comment';
import { connect } from 'react-redux';
const FormItem = Form.Item;

const { TextArea } = Input;

import R from '../config/R';

class SendCommentArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.systemRequestApi = new SystemRequestsNetworkAdapter(this.props.user.user);
    }

    handleSubmit(item) {
        item.preventDefault();
        this.props.form.validateFieldsAndScroll(function (err, values) {

            if (!err) {
                var comment = new Comment(values.content);
                this.props.onCommentSending();
                this.systemRequestApi.sendCommentForRequest(this.props.sysreq.id, comment)
                    .then(function (e) {                        
                        this.props.onSendCommentOK();
                        this.handleReset();
                    }.bind(this))
                    .catch(function (e) {
                    }.bind(this))

            }
        }.bind(this));
    }

    handleReset = () => {
        this.props.form.resetFields();
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...R.formItemLayout}
                        label="Yorum"
                    >
                        {getFieldDecorator('content', {})(
                            <TextArea rows={3} placeholder="Yorum..." onPressEnter={this.handleSubmit}/>
                        )}
                    </FormItem>
                    <FormItem {...R.tailFormItemLayout}>
                        <Button disabled={this.state.ready} type="primary" htmlType="submit">GÖNDER</Button>
                    </FormItem>
                </Form>
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

const connectedSendCommentArea = connect(mapStateToProps)(SendCommentArea);

export default connectedSendCommentArea;