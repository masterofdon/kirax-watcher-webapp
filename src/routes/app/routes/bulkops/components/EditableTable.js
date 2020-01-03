import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import R from '../config/R';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    var values = dataIndex.split('.');
                    var value = record;
                    for (var i = 0; i < values.length; i++) {
                        value = value[values[i]]
                    }
                    if(value === "MORNING"){
                        value = "SABAH"
                    }else if(value === "EVENING"){
                        value = "EVENING"
                    }
                    return (
                        <td {...restProps}>
                            <FormItem style={{ margin: 0 }}>
                                {getFieldDecorator(dataIndex, {
                                    rules: [],
                                    initialValue: value,
                                })(this.getInput())}
                            </FormItem>
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editingKey: '' };

    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const { dataType } = this.props;
        this.columns = null, this.scroll = {};
        switch (dataType) {
            case "route":
                this.columns = R.tables.routeTable;
                this.scroll = { y: 800, x: 3500 };
                break;
            case "vehicleschedule":
                this.columns = R.tables.vehicleScheduleTable;
                this.scroll = { y: 800, x: 2000 };
                break;
            case "tablet":
                this.columns = R.tables.tabletsTable;
                this.scroll = { y: 800, x: 1500 };
                break;
            case "driver":
                this.columns = R.tables.driversTable;
                this.scroll = { y: 800, x: 1200 };
                break;
            default:
                this.columns = null;
        }
        const columns = this.columns && this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title
                }),
            };
        });
        return (
            <Table
                pagination={{ pageSize: 100 }}
                scroll={this.scroll}
                components={components}
                loading={this.props.loading}
                bordered
                dataSource={this.props.data}
                columns={columns}
                rowClassName="editable-row"
            />
        );
    }
}