import React, { Component } from 'react';
import { Radio, Button } from 'antd';
import 'styles/routes/app/routes/bulkops/BulkOpsRadioStyle.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class BulkVehicleRemoveRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onValueChanged();
    }

    render() {
        const style = {
            "transition": "border-color 0.3s",
            "cursor": "pointer",
            "borderRadius": "4px",
            "textAlign": "center",
            "width": "100%",
            "height": "100%",
            "position": "relative",
            "padding": "16px 0",
            "background": "#fafafa",
            "border": "1px dashed #d9d9d9"
        }
        return (
            <div style={style} className="op-select-radio-container" >
                <Button.Group size={'large'}>
                    <Button type="danger" onClick={this.onChange.bind(this, 'removevehicle')}>Tüm Araçları Sil</Button>
                    <Button type="danger">Sözleşme Koduna Göre</Button>
                    <Button type="danger">Sahip Durumuna Göre</Button>
                </Button.Group>
            </div>
        );
    }
}