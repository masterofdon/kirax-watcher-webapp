import React , {Component} from 'react';
import {Row , Col , Form } from 'antd';

const FormItem = Form.Item;

import AgencyStudentRegFieldsWidget from './AgencyStudentRegFieldsWidget';
const WrappedRegistrationForm = Form.create()(AgencyStudentRegFieldsWidget);

export default class AgencyStudentRegFieldsPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <WrappedRegistrationForm 
                onParentNameChanged={this.props.onParentNameChanged}
                onParentAddressSelected={this.props.onParentAddressSelected}
                districts={this.props.districts}
                pricingpolicies={this.props.pricingpolicies}
                contract={this.props.contract}
                discounts={this.props.discounts}
                onDiscountChecked={this.props.onDiscountChecked}
                onDistrictSelected={this.props.onDistrictSelected}
                onGradeSelected={this.props.onGradeSelected}
                onPricingpolicySelected={this.props.onPricingpolicySelected}
                onCutByChanged={this.props.onCutByChanged}
                onCutByExpChanged={this.props.onCutByExpChanged}
                onStudentAdded={this.props.onStudentAdded}
                onStudentDeleted={this.props.onStudentDeleted}
                clear={this.props.clear}
            />
        );
    }
}