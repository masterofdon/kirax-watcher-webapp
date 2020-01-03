import React, { Component } from 'react';
import { Avatar, List, Row, Col, Button } from 'antd';
import { Upload, message } from 'antd';
import { Card, Tooltip , Spin } from 'antd';
const { Meta } = Card;

export default class ParentSubjectStudentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailstudent: null,
            detailsopen: false,
        }
        this.onStudentDetailsClicked = this.onStudentDetailsClicked.bind(this);
    }

    onStudentDetailsClicked(item) {
        console.log(item.target.value);
        if (!this.state.detailsopen || (this.state.detailsopen && this.state.detailstudent.id !== item.target.value)) {
            var x = this.findStudentById(item.target.value);
            this.setState({
                detailstudent: x,
                detailsopen: true
            });
        } else {
            this.setState({
                detailstudent: null,
                detailsopen: false
            })
        }
    }

    findStudentById(id) {
        const { students } = this.props;
        var len = students.length;
        for (var i = 0; i < len; i++) {
            if (students[i].id === id) {
                return Object.assign({}, students[i]);
            }
        }
    }

    render() {
        const { students } = this.props;
        const style = {
            containerDivStyle: {
                padding: '40px'
            },
            rowStyle: {
                marginTop: '10px',
                marginBottom: '10px',
                borderBottom: '1px solid black',
                borderTop: '1px solid black'
            }
        };
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div style={style.containerDivStyle}>
                <Row>
                    <Spin spinning={this.props.studentListLoading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={students}
                            grid={{ gutter: 8, column: 2 }}
                            renderItem={item => (
                                <List.Item style={{}} actions={[<Button value={item.id} onClick={this.onStudentDetailsClicked} style={{ color: '#3478e5' }} size={'small'}>{(this.state.detailsopen && this.state.detailstudent.id === item.id) ? "Kapat" : "Yönet"}</Button>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profilepic} />}
                                        title={<a style={{ color: '#3478e5' }} href={"profiles/students/" + item.id}>{item.name}</a>}
                                        description={item.school.name + " ===> " + item.routes[0].name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Spin>
                </Row>
                {this.state.detailsopen && <Row style={style.rowStyle}>
                    <Col span={19} offset={1}>
                        <Row>
                            <Col span={6} offset={1}>
                                <div>
                                    <Card
                                        hoverable
                                        style={{ borderRadius: '5px' }}
                                        bordered={false}
                                        cover={<Upload {...props}><img style={{ width: '100%' }} alt="example" src="/asset/images/noprofilepic.png" /></Upload>}
                                    >
                                        <Meta
                                            title={
                                                <Tooltip style={{ fontSize: '12px' }} placement="topLeft" title={this.state.detailstudent && this.state.detailstudent.name}>
                                                    {this.state.detailstudent && this.state.detailstudent.name}
                                                </Tooltip>
                                            }
                                        >
                                        </Meta>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={10}>

                            </Col>
                        </Row>
                    </Col>
                </Row>}
            </div>
        );
    }
}