import React , {Component} from 'react';
import { Col, Row, Select, Table, Button, Divider, Spin } from 'antd';
import debounce from 'lodash/debounce';
import R from '../config/R';
import CamerasNetworkAdapter from 'services/network/CamerasNetworkAdapter';
import { connect } from 'react-redux';

class CameraSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            value: [],
            fetching: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.queryCamera = debounce(this.queryCamera, 1000);
        this.camerasApiAdapter = new CamerasNetworkAdapter(this.props.user.user);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
    }

    queryCamera = (value) => {
        console.log('fetching license plate', value);
        this.setState({ data: [], fetching: true });
        this.vehiclesApiAdapter.queryVehiclesByLicensePlate(value, { page: 0, size: 5 })
            .then(function (e) {
                this.setState({
                    data: e.data.content,
                    fetching: false
                })
            }.bind(this))
            .catch(function (e) {
                console.log(e);
            }.bind(this));
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
                this.props.onCameraAdded(this.state.data[i])
            }
        }

    }

    onDeselect(item) {
        this.props.onCameraRemoved(item)
    }

    render(){
        const { fetching, data, value } = this.state;
        return(
            <div style={{ margin: '10px', padding: '15px' }}>
                <Row gutter={8}>
                    <Col offset={1} span={13}>
                        <h2 >Canlı Araç Kamera Takibi</h2>
                        <Select
                            mode="multiple"
                            labelInValue
                            value={value}
                            placeholder="Plaka Seçin..."
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={this.queryCamera}
                            onChange={this.handleChange}
                            onSelect={this.onSelect}
                            onDeselect={this.onDeselect}
                            style={{ width: '100%' }}
                        >
                            {data.map(d => <Option key={d.id}>{d.id}</Option>)}
                        </Select>
                    </Col>
                    <Col offset={3} span={6}>
                        <h2 >Sık Kullanılan Kameralar</h2>
                        <Divider />
                        <Button style={{ width: '230px', marginTop: '10px' }}>Bütün Kameralar</Button>
                        <Button style={{ width: '230px', marginTop: '10px' }}>Şirkete Ait Araçların Kameraları</Button>
                        <Button type="dashed" style={{ width: '230px', marginTop: '10px' }}>Yeni Profil Kaydet</Button>
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

const connectedCameraSelector = connect(mapStateToProps)(CameraSelector);

export default connectedCameraSelector;
