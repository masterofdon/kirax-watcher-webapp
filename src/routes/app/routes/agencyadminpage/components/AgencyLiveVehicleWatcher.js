import React, { Component } from 'react';

export default class AgencyLiveVehicleWatcher extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onLocationMessage(item) {
        console.log(item);
        this.props.onLocationMessageReceived(item);
    }

    onStatusMessage(item) {
        console.log(item);
        this.props.onStatusMessageReceived(item);
    }

    render() {
        const { vehicles } = this.props;
        var vehicleLocationMap = vehicles && vehicles.map(function (e) {
            return '/topic/vehicle-location-' + e.id
        }.bind(this));
        var vehicleStatus = vehicles && vehicles.map(function (e) {
            return '/topic/vehicle-status-' + e.id
        }.bind(this))
        return (
            <div>
            </div>
        );
    }
}