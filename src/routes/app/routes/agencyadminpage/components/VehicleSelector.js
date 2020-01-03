import React, { Component } from 'react';
import { Col, Row, Select, Table, Button, Divider, Spin } from 'antd';
import debounce from 'lodash/debounce';
import R from '../config/R';
import VehiclesNetworkAdapter from 'services/network/VehiclesNetworkAdapter';
import { connect } from 'react-redux';

const Option = Select.Option;

class VehicleSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: [],
            fetching: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.queryVehicle = debounce(this.queryVehicle, 1000);
        this.vehiclesApiAdapter = new VehiclesNetworkAdapter(this.props.user.user);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
    }

    handleVehicleSelect() {

    }

    handleVehicleRemove() {

    }

    queryVehicle = (value) => {
        console.log('fetching license plate', value);
        this.setState({ data: [], fetching: true });
        if(this.props.agency){
            this.vehiclesApiAdapter.queryVehiclesByLicensePlateInAgency(this.props.agency.id , value, { page: 0, size: 5 })
            .then(function (e) {
                this.setState({
                    data: e.data.content,
                    fetching: false
                })
            }.bind(this))
            .catch(function (e) {
                console.log(e);
            }.bind(this));
        } else {
            // FUCK this...
        }
        
    }

    handleChange = (value) => {
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    }

    onSelect(item) {
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].id === item.key) {
                this.props.onVehicleAdded(this.state.data[i])
            }
        }

    }

    onDeselect(item) {
        this.props.onVehicleRemoved(item)
    }

    render() {
        const { fetching, data, value } = this.state;
        return (
            <div style={{ margin: '10px', padding: '15px' }}>
                <Row gutter={8}>
                    <Col offset={1} span={13}>
                        <h2 >Canlı Araç Takibi</h2>
                        <Select
                            mode="multiple"
                            labelInValue
                            value={value}
                            placeholder="Plaka Seçin..."
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.queryVehicle}
                            onChange={this.handleChange}
                            onSelect={this.onSelect}
                            onDeselect={this.onDeselect}
                            style={{ width: '100%' }}
                        >
                            {data.map(d => <Option key={d.id}>{d.licensePlate}</Option>)}
                        </Select>
                    </Col>
                    <Col offset={3} span={6}>
                        <h2 >Sık Kullanılan Seçimler</h2>
                        <Divider />
                        <Button style={{ width: '200px', marginTop: '10px' }}>Bütün Araçlar</Button>
                        <Button style={{ width: '200px', marginTop: '10px' }}>Şirkete Ait Araçlar</Button>
                        <Button style={{ width: '200px', marginTop: '10px' }}>Bugün Çalışan Araçlar</Button>
                    </Col >
                </Row>
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

const connectedVehicleSelector = connect(mapStateToProps)(VehicleSelector);

export default connectedVehicleSelector;
