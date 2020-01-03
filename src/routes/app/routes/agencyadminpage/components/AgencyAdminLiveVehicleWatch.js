import React, { Component } from 'react';
import GoogleMap from 'routes/app/components/GoogleMap';
import { Marker, Icon, InfoWindow, Polyline } from "react-google-maps"
import VehicleLocation from '../models/VehicleLocation';
import AgencyLiveVehicleWatcher from './AgencyLiveVehicleWatcher';
import VehicleSelector from './VehicleSelector';
import SelectedPlatesContainer from './SelectedPlatesContainer';
import { connect } from 'react-redux';
import LiveMapWatchRouteSummary from './LiveMapWatchRouteSummary';

const rangeArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 135, 150, 165, 180];

class AgencyAdminLiveVehicleWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            clickedVehicles: [],
            vehiclesLastLocations: [],
            mapFocus: null,
            currentPlayingIndex : 0,
            busCurrentLocation : null,
            playing : false,
            zoom : 16
        }
        this.onLocationMessageReceived = this.onLocationMessageReceived.bind(this);
        this.onStatusMessageReceived = this.onStatusMessageReceived.bind(this);
        this.handleVehicleAdd = this.handleVehicleAdd.bind(this);
        this.handleVehicleRemove = this.handleVehicleRemove.bind(this);
        this.handlePlateDoubleClick = this.handlePlateDoubleClick.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.busMarkerBuilder = this.busMarkerBuilder.bind(this);
        this.handleSliderValueChange = this.handleSliderValueChange.bind(this);
        this.handlePlayClicked = this.handlePlayClicked.bind(this);
        this.handlePauseClicked = this.handlePauseClicked.bind(this);
        this.handleStopClicked = this.handleStopClicked.bind(this);
        this.resumePlay = this.resumePlay.bind(this);
    }

    onLocationMessageReceived(message) {
        console.log("Message Received for vehicle.")
        console.log(message);
        const index = this.indexOfVehicleId(message.vehicleId);
        if (index != -1) {
            var vehicle = this.state.vehicles[index];
            var vehicleLocation = new VehicleLocation(vehicle, message.location, message.bearing, message.speeed)
            const vehicleLastLocationIndex = this.indexOfLastVehicleLocation(vehicle);
            if (vehicleLastLocationIndex != -1) {
                this.state.vehiclesLastLocations.splice(vehicleLastLocationIndex, 1);
            }
            this.state.vehiclesLastLocations.push(vehicleLocation);
            this.setState({
                vehiclesLastLocations: this.state.vehiclesLastLocations
            })
        } else {
            console.error("No such vehicle found.")
        }

    }

    onStatusMessageReceived(message) {
        console.log("Message Received for vehicle.")
        console.log(message);
        const index = this.indexOfVehicleId(message.vehicleId);
        if (index != -1) {
            this.state.vehicles[index].tablet.online = message.online;
            this.setState({
                vehicles: this.state.vehicles
            })
        } else {
            console.error("No such vehicle found.")
        }
    }

    toogleVehicle(item) {
        const index = this.state.clickedVehicles.indexOf(item.id);
        if (index == -1) {
            this.state.clickedVehicles.push(item.id)
            this.setState({
                clickedVehicles: this.state.clickedVehicles
            });
        } else {
            this.state.clickedVehicles.splice(index, 1);
            this.setState({
                clickedVehicles: this.state.clickedVehicles
            });
        }
    }

    indexOfLastVehicleLocation(vehicle) {
        const { vehiclesLastLocations } = this.state;
        for (var i = 0; i < vehiclesLastLocations.length; i++) {
            if (vehiclesLastLocations[i].vehicle.id == vehicle.id) {
                return i;
            }
        }
        return -1;
    }

    isVehicleClicked(vehicleid) {
        const index = this.state.clickedVehicles.indexOf(vehicleid);
        if (index == -1) {
            return false;
        }
        return true;
    }

    busMarkerBuilder(vehicle) {
        if (vehicle == null) {
            return;
        }
        const { vehiclesLastLocations } = this.state;
        const index = this.indexOfLastVehicleLocation(vehicle);
        var busLocation = index == -1 ? vehicle.lastLocation : vehiclesLastLocations[index].location;
        if (busLocation == null) {
            return;
        }
        var busBearing = index == -1 ? 90 : vehiclesLastLocations[index].bearing
        var x = closest(busBearing - 90, rangeArray);
        console.log("Closest: " + x);
        var icon = "/asset/images/icons/busmarker/bus_" + x + "_deg.png";
        return <Marker icon={icon}
            key={vehicle.id}
            onClick={this.toogleVehicle.bind(this, vehicle)}
            position={{ lat: parseFloat(busLocation.lat), lng: parseFloat(busLocation.lng) }}
            text={'Kreyser Avrora'}
        >
            {this.isVehicleClicked(vehicle.id) && <InfoWindow
                onCloseClick={this.toogleVehicle.bind(this, vehicle)}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ padding: `12px` }}>
                    <div style={{ fontSize: `18px`, fontColor: `#08233B`, fontWeight: 600 }}>
                        {vehicle.licensePlate}
                    </div>
                </div>
            </InfoWindow>

            }
        </Marker>
    }

    handleDateSelected(date) {
        this.props.handleDateSelected(date);
    }

    handleVehicleAdd(vehicle) {
        if (this.indexOfVehicle(vehicle) == -1) {
            this.state.vehicles.push(vehicle);
            this.setState({
                vehicles: this.state.vehicles
            })
        }
    }

    handleVehicleRemove(vehicle) {
        const index = this.indexOfVehicleId(vehicle.key);
        if (index != -1) {
            this.state.vehicles.splice(index, 1);
            this.setState({
                vehicles: this.state.vehicles
            })
        }
    }

    indexOfVehicle(vehicle) {
        for (var i = 0; i < this.state.vehicles.length; i++) {
            if (vehicle.id == this.state.vehicles[i].id) {
                return i;
            }
        }
        return -1;
    }

    indexOfVehicleId(vehicleid) {
        for (var i = 0; i < this.state.vehicles.length; i++) {
            if (vehicleid == this.state.vehicles[i].id) {
                return i;
            }
        }
        return -1;
    }

    handlePlateDoubleClick(vehicle) {
        this.setState({
            mapFocus: vehicle
        })
    }



    handlePauseClicked() {
        this.setState({ playing: false })
        clearInterval(this.playerInterval);
    }

    handlePlayClicked() {
        this.setState({ isLive: false })
        this.playerInterval = setInterval(this.resumePlay.bind(this), 1000);
    }

    handleStopClicked() {
        this.setState({
            playing: false,
            currentPlayingIndex: 0,
            busCurrentLocation: this.props.path[0].data,
            busCurrentTime: null
        })
        clearInterval(this.playerInterval);
    }

    resumePlay() {
        if (this.state.currentPlayingIndex == this.props.path.length) {
            this.handleStopClicked();
            return;
        }
        const cIndex = this.state.currentPlayingIndex++;
        this.setState({
            busCurrentLocation: this.props.path[cIndex].data,
            busCurrentSpeed: this.props.speedMap[cIndex],
            busCurrentTime: this.props.path[cIndex].data.timestamp,
            playing: true
        });
    }

    handleSliderValueChange(value) {
        const cIndex = this.state.currentPlayingIndex++;
        this.setState({
            currentPlayingIndex: value,
            busCurrentLocation: this.props.path[cIndex].data,
            busCurrentSpeed: this.props.speedMap[cIndex],
            isLive: false
        });
    }

    render() {
        const { vehicles, currentBusSpeed, playing, speedMap, currentPlayingIndex } = this.state;
        const { voyage, voyagePath, mode, agency } = this.props;
        var busMarkerMap = null;
        var focusLocation = agency && agency.location;
        busMarkerMap = vehicles.map(function (e) {
            return this.busMarkerBuilder(e)
        }.bind(this));
        return (
            <div>
                <VehicleSelector
                    agency={this.props.agency}
                    onVehicleAdded={this.handleVehicleAdd}
                    onVehicleRemoved={this.handleVehicleRemove}
                />
                <SelectedPlatesContainer
                    vehicles={vehicles}
                    onPlateDoubleClicked={this.handlePlateDoubleClick}
                />
                <div style={{ height: '100vh', width: '100%' }}>
                    {mode == "past" ? <LiveMapWatchRouteSummary
                        currentPath={voyagePath}
                        speedmap={speedMap}
                        playing={playing}
                        busspeed={currentBusSpeed}
                        voyage={voyage}
                        mode={mode}
                        onDateSelected={this.handleDateSelected}
                        max={this.props.voyagePath && this.props.voyagePath.length}
                        value={currentPlayingIndex}
                        onStopClicked={this.handleStopClicked}
                        onPlay={this.handlePlayClicked}
                        onPause={this.handlePauseClicked}
                        onSliderValueChanged={this.handleSliderValueChange}
                        time={this.state.busCurrentTime}
                    /> : <div></div>}
                    <GoogleMap
                        lat={focusLocation && focusLocation.lat}
                        lng={focusLocation && focusLocation.lng}
                        zoom={this.state.zoom}
                    >
                        {busMarkerMap}
                        {this.props.voyagePath && <Polyline
                            path={this.props.voyagePath}
                            options={{ strokeColor: "#00ac0f", strokeWeight: 5 }}
                        />}
                    </GoogleMap>
                </div>

                <AgencyLiveVehicleWatcher
                    onLocationMessageReceived={this.onLocationMessageReceived}
                    onStatusMessageReceived={this.onStatusMessageReceived}
                    vehicles={vehicles}
                />
            </div>
        );
    }
}

function closest(num, arr) {
    var curr = arr[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs(num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

function radians(n) {
    return n * (Math.PI / 180);
}
function degrees(n) {
    return n * (180 / Math.PI);
}

function getBearing(startLat, startLong, endLat, endLong) {
    startLat = radians(startLat);
    startLong = radians(startLong);
    endLat = radians(endLat);
    endLong = radians(endLong);

    var dLong = endLong - startLong;

    var dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));
    if (Math.abs(dLong) > Math.PI) {
        if (dLong > 0.0)
            dLong = -(2.0 * Math.PI - dLong);
        else
            dLong = (2.0 * Math.PI + dLong);
    }

    return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAgencyAdminLiveVehicleWatch = connect(mapStateToProps)(AgencyAdminLiveVehicleWatch);

export default connectedAgencyAdminLiveVehicleWatch;