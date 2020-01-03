import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import EditableTable from './EditableTable';

export default class BulkOperationsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <EditableTable
                    dataType={this.props.dataType}
                    data={data}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}