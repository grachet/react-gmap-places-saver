import React, {Component} from 'react'
import Map from 'pigeon-maps'

export default class TravelMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (

            <div style={{height: "100vh", width: "100%"}}>
                <Map center={position} zoom={this.state.zoom}>

                </Map>
            </div>

        )
    }
}