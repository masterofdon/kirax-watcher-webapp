import React , {Component} from 'react';
import CameraSelector from './CameraSelector';

export default class AgencyAdminLiveCameraWatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            cameras : null
        }
        this.handleCameraAdded = this.handleCameraAdded.bind(this);
        this.handleCameraRemoved = this.handleCameraRemoved.bind(this);
    }

    handleCameraAdded(camera){

    }

    handleCameraRemoved(item){

    }

    render(){
        return(
            <div>
                <CameraSelector
                    cameras={this.state.cameras}
                    onCameraAdded={this.handleCameraAdded}
                    onCameraRemoved={this.handleCameraRemoved}
                />
            </div>
        );
    }
}