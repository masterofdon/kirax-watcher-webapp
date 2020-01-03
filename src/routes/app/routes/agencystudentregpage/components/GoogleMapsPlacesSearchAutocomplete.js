import React, { Component } from 'react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const searchOptions = {
    location: new google.maps.LatLng(36.875528, 30.709150),
    radius: 2000
}

export default class GoogleMapsPlacesSearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    handleChange = address => {
        console.log(address);
        this.setState({ address });
    };

    handleSelect = address => {
        console.log("Erdem" ,address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(function(latLng){
                console.log('Success', latLng);
                this.props.onAddressSelected(latLng);
            }.bind(this))
            .catch(error => console.error('Error', error));
    };

    render() {

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
                shouldFetchSuggestions={true}
                debounce={800}
                onError={(status) => {
                    console.log(status);
                }}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Adres ara...',
                                className: 'ant-input',
                            }) }
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Doluyor...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        }) }
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}