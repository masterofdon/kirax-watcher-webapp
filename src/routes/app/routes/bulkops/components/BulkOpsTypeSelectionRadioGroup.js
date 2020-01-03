import React, { Component } from 'react';
import { Radio , Button} from 'antd';
import 'styles/routes/app/routes/bulkops/BulkOpsRadioStyle.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class BulkOpsTypeSelectionRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        console.log(`radio checked:${e.target.value}`);
        this.props.onValueChanged(e.target.value);
    }

    render() {
        return (
            <div className="op-select-radio-container" >
                <RadioGroup onChange={this.onChange} buttonStyle="solid" size="large">
                    <RadioButton className="op-select-radio" value="a">Öğrenci Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="b">Veli Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="c">Araç Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="d">Tablet Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="e">Rota Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="f">Çalışma Takvim Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="g">Şoför Ekle</RadioButton >
                    <RadioButton className="op-select-radio" value="h">Toplu Rota Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="i">Toplu Okul Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="j">Toplu Öğrenci Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="k">Toplu Veli Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="l">Toplu Sözleşme Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="m">Toplu Araç Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="n">Toplu Tablet Sil</RadioButton >
                    <RadioButton className="op-select-radio" value="o">Toplu Tablet Değiştir</RadioButton >
                </RadioGroup>
            </div>
        );
    }
}