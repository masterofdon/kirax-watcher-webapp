import React from 'react';
import { Row, Col, Button, Input, Spin } from 'antd';

export default class FileBrowserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { files } = this.props;

        const filesMap = files.map((file) => {
            if (file.selected) {
                return <Row>
                    <Col span={3}>
                        <Button
                            icon={'file'}
                            type={'danger'}
                            size={'small'}
                        />
                    </Col>
                    <Col span={20}>
                        {file.note}
                    </Col>
                </Row>
            }
        })
        return (
            <Row style={{
                margin : '16px'
            }}>
                <Col>
                    {filesMap}
                </Col>
            </Row>
        )
    }
}