import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/travelStyle'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapIcon from '@material-ui/icons/Map';
import NoMapIcon from '@material-ui/icons/Dashboard';
import connect from "react-redux/es/connect/connect";
import PlaceSearcher from '../components/PlaceSearcher'
import TravelGrid from '../components/TravelGrid'
import {bindActionCreators} from 'redux';
import {updateProject} from '../redux/actions/projects'
import ReactMapGL, {FlyToInterpolator, Marker} from 'react-map-gl';
import MarkerMap from "../components/MarkerMap";
import {mapBoxKey} from "../config/dev";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ActionButton from "../components/ActionButton"
import TerrainIcon from "@material-ui/icons/Terrain";
import TopIcon from "@material-ui/icons/ArrowUpward";
import {setMapStyle} from "../redux/actions/user";
import BottomNavigation from "../components/BottomNavigation"


var _ = require('lodash');
var uniqid = require('uniqid');
var moment = require('moment');

const MAP_STYLE = [
  "default",
  "basic",
  "streets",
  "bright",
  "satellite"
]

class Home extends Component {

  state = {
    viewport: {
      width: "100%",
      height: "100%",
      longitude: 2.3514992,
      latitude: 48.8566101,
      zoom: 9,
      pitch: 85
    },
    mapsVisible: true,
    openAlert: false,
    messageAlert: null
  }

  goToPlace = (place) => {
    this.setState({
      mapsVisible: true,
      viewport: {
        ...this.state.viewport,
        latitude: place.geometry.coordinates[1],
        longitude: place.geometry.coordinates[0],
        zoom: 9,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
      }
    })
  }

  changePlace = (place) => {
    console.log("place", place)
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: place.geometry.coordinates[1],
        longitude: place.geometry.coordinates[0],
        zoom: 9,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
      }
    })
  }

  changeMapStyle = () => {
    const {user} = this.props;
    let ms = user.mapStyle || "default";
    let index = MAP_STYLE.indexOf(ms);
    this.props.setMapStyle(MAP_STYLE[index + 1] || MAP_STYLE[0])
  }

  close = () => {
    this.setState({openAlert: false, messageAlert: null})
  }

  open = (messageAlert) => {
    this.setState({openAlert: true, messageAlert})
  }

  _renderMarker = (place, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={place.geometry.coordinates[0]}
        latitude={place.geometry.coordinates[1]}>
        <MarkerMap size={20}
                   onClick={() => {
                     console.log("place", place);
                     this.open([place.name, place.properties.name, place.properties.city, place.properties.state, place.properties.country].filter(Boolean).join(" - "))
                   }}
        />
      </Marker>
    );
  }

  renderTravelMap = (project) => {
    const {user} = this.props;

    let mapStyle = (user.mapStyle === "default" || !user.mapStyle) ? user.darkTheme ? "mapbox://styles/mapbox/dark-v9" : "mapbox://styles/mapbox/light-v9"
      : "mapbox://styles/mapbox/" + user.mapStyle + "-v9";

    return (
      <div style={{height: "100vh", width: "100%", margin: 0}}>
        <ReactMapGL
          mapStyle={mapStyle}
          mapboxApiAccessToken={mapBoxKey}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}>
          {project && project.places && Object.values(project.places).map(
            (place, index) => this._renderMarker(place, index)
          )}
        </ReactMapGL>
      </div>)
  }

  render() {
    const {id} = this.props.match.params;
    const {classes, projects} = this.props;

    if (!projects) {
      return null
    }

    let project = projects[id];
    const {travelName, country} = project;
    return (

      <div className={classes.root}>
        <Snackbar
          style={{zIndex: 100000}}
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
        />
        <Navigation title={travelName + " - " + country}/>

        <BottomNavigation
          actions={[
            {
              icon: this.state.mapsVisible ? <NoMapIcon/> : <MapIcon/>,
              action: () => this.setState({mapsVisible: !this.state.mapsVisible})
            },
            {
              icon: <TerrainIcon/>,
              action: () => this.changeMapStyle()
            }, {
              icon: <TopIcon/>,
              action: () => window.scrollTo(0, 0)
            }
          ]}
        />
        <ActionButton
          mainAction={{
            icon: this.state.mapsVisible ? <NoMapIcon/> : <MapIcon/>,
            name: '',
            action: () => this.setState({mapsVisible: !this.state.mapsVisible})
          }}
          actions={this.state.mapsVisible && [{
            icon: <TerrainIcon/>,
            name: 'Change map theme',
            action: () => this.changeMapStyle()
          }]}
        />


        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <PlaceSearcher changePlace={this.changePlace} updateProject={this.props.updateProject} project={project}/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={9}>
            {this.state.mapsVisible && this.renderTravelMap(project)}
            {!this.state.mapsVisible && <TravelGrid goToPlace={this.goToPlace} updateProject={this.props.updateProject} project={project}/>}
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = ({user, projects}) => {
  return {
    projects, user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProject, setMapStyle
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

