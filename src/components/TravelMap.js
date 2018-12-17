import React, {Component} from 'react'
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MarkerMap from './MarkerMap'

import ReactMapGL, {Marker} from 'react-map-gl';
import {mapBoxKey} from '../config/keys'

export default class TravelMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100%",
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    openAlert: false,
    messageAlert: null
  }

  _renderMarker = (place, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={place.geometry.coordinates[0]}
        latitude={place.geometry.coordinates[1]}>
        <MarkerMap size={20}
                   onClick={() => this.open([place.name, place.properties.city, place.properties.country].filter(Boolean).join(" - "))}/>
      </Marker>
    );
  }

  close = () => {
    this.setState({openAlert: false, messageAlert: null})
  }

  open = (messageAlert) => {
    this.setState({openAlert: true, messageAlert})
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const {project, user} = this.props

    let mapStyle = (user.mapStyle === "default" || !user.mapStyle) ? user.darkTheme ? "mapbox://styles/mapbox/dark-v9" : "mapbox://styles/mapbox/light-v9"
      : "mapbox://styles/mapbox/" + user.mapStyle + "-v9"
    return (

      [<div style={{height: "100vh", width: "100%", margin: 0}}>
        <ReactMapGL
          mapStyle={mapStyle}
          mapboxApiAccessToken={mapBoxKey}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}>
          {project && project.places && Object.values(project.places).map(
            (place, index) => this._renderMarker(place, index)
          )}
        </ReactMapGL>
      </div>,
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openAlert}
          autoHideDuration={5000}
          onClose={() => this.close()}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>{this.state.messageAlert}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={"closeSnack"}
              onClick={() => this.close()}
            >
              <CloseIcon/>
            </IconButton>
          }
        />]

    )
  }
}