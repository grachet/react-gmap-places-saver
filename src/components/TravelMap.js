import React, {Component} from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

export default class TravelMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
      const { project } = this.props
        return (

            <div style={{height: "100vh", width: "100%", margin:0}}>
                <Map center={position} zoom={this.state.zoom}>
                  {project && project.places && Object.values(project.places).map(
                    place => <Marker anchor={place.geometry.coordinates} payload={1} onClick={({ event, anchor, payload }) => {}} />
                  )}
                </Map>
            </div>

        )
    }
}