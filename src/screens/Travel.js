import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/homeStyle'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../components/ProjectCard'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import NoMapIcon from '@material-ui/icons/Dashboard';
import connect from "react-redux/es/connect/connect";

import TravelMap from '../components/TravelMap'
import TravelGrid from '../components/TravelGrid'
import {bindActionCreators} from 'redux';
import {addUserToProject, createProject, deleteProject, removeUserFromProject} from '../redux/actions/projects'
import PromptDialogue from '../components/PromptDialogue'
import UsersModal from '../components/UsersModal'
var _ = require('lodash');
var uniqid = require('uniqid');
var moment = require('moment');

class Home extends Component {

  state = {
    mapsVisible:true
  };

  render() {
    const {id} = this.props.match.params;
    const {classes, projects} = this.props;
    let project = projects[id];
   const {travelName, country} = project;
    return (
      <div className={classes.container}>
        <Navigation title={travelName + " - " + country}/>
        <Button onClick={() => this.setState({mapsVisible:!this.state.mapsVisible})} variant="fab" color="secondary" aria-label="Add"
                className={classes.fab}>
          {!this.state.mapsVisible && <NoMapIcon/>}
          {this.state.mapsVisible && <MapIcon/>}
        </Button>
        {!this.state.mapsVisible && <TravelMap/>}
        {this.state.mapsVisible && <TravelGrid/>}
      </div>
    );
  }
}


const mapStateToProps = ({user, projects}) => {
  return {
    projects, currentUser: user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

