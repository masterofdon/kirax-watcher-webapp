import React, { Component } from 'react';
import {

    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

export default class ProfileInteractionMap extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const wrapperStyles = {
            width: "100%",
            maxWidth: 700,
            height: 300            
        }
        return (
            <div style={wrapperStyles}>
                <ComposableMap
                    projection="mercator"
                    projectionConfig={{ scale: 1300 }}
                    style={{
                        width: "100%",
                        height: "300",
                    }}
                >
                    <ZoomableGroup center={[17, 26.8]} disablePanning>
                        <Geographies geography="/asset/data/turkiye.json">
                            {(geographies, projection) =>
                                geographies.map((geography, i) =>
                                    geography.ID_ !== "ATA" && (
                                        <Geography
                                            key={i}
                                            geography={geography}
                                            projection={projection}
                                            style={{
                                                default: {
                                                    fill: "#ECEFF1",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#607D8B",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: "#FF5722",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}