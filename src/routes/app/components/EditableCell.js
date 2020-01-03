import React from 'react';
import 'styles/routes/app/components/EditableCell.css'
import { AutoComplete, Icon, Select, Spin } from 'antd';

const Option = Select.Option;

export default class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: false
        }
    }

    handleChange = (value) => {
        if (this.props.onQuery) {
            this.props.onQuery(value);
        }
        this.setState({ value });
    }

    check = (item) => {
        this.setState({ editable: false, value: item });
        if (this.props.onChange) {
            this.props.onChange(this.props.findSelectedIndex(this.props.dataSource , item));
        }
    }

    edit = () => {
        this.setState({ editable: true });
    }

    componentWillReceiveProps(){
        this.state.value = this.props.value;
        this.setState({value : this.state.value});
    }

    render() {
        const { value, editable } = this.state;
        const { dataSource } = this.props;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <AutoComplete
                                value={value}
                                optionLabelProp={"value"}
                                onSearch={this.handleChange}
                                onPressEnter={this.check.bind(this)}
                                onSelect={this.check.bind(this)}
                                dataSource={dataSource && dataSource.map(this.props.renderOption)}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check.bind(this)}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit.bind(this)}
                            />
                        </div>
                }
            </div>
        );
    }
}

function renderOption(item) {
    return (
        <Option key={item.id} text={item.name} value={item.name}>
            <span>{item.name}</span>
        </Option>
    );
}