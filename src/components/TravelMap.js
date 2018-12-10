import React, {Component} from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class TravelMap extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    openAlert: false,
    messageAlert: null
  }

  close = () => {
    this.setState({openAlert: false, messageAlert: null})
  }

  open = (messageAlert) => {
    this.setState({openAlert: true, messageAlert})
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const {project} = this.props
    return (

      [<div style={{height: "100vh", width: "100%", margin: 0}}>
        <Map center={position} zoom={this.state.zoom}>
          {project && project.places && Object.values(project.places).map(
            place => <Marker anchor={place.geometry.coordinates} payload={1} onClick={({event, anchor, payload}) => {
              this.open([place.name, place.properties.city ,place.properties.country].filter(Boolean).join(" - "))
            }}/>
          )}
        </Map>
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