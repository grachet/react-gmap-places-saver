import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/travelStyle'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../components/ProjectCard'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import NoMapIcon from '@material-ui/icons/Dashboard';
import connect from "react-redux/es/connect/connect";
import PlaceSearcher from '../components/PlaceSearcher'
import TravelMap from '../components/TravelMap'
import TravelGrid from '../components/TravelGrid'
import {bindActionCreators} from 'redux';
import {updateProject} from '../redux/actions/projects'
import PromptDialogue from '../components/PromptDialogue'
import UsersModal from '../components/UsersModal'


var _ = require('lodash');
var uniqid = require('uniqid');
var moment = require('moment');

const defaultProps = {
    center: {lat: 40.7446790, lng: -73.9485420},
    zoom: 11
}

class Home extends Component {

    state = {
        mapsVisible: true
    };

    render() {
        const {id} = this.props.match.params;
        const {classes, projects} = this.props;

        if (!projects) {return null}

        let project = projects[id];
        const {travelName, country} = project;
        return (

            <div className={classes.root}>
                <Navigation title={travelName + " - " + country}/>
                <Button onClick={() => this.setState({mapsVisible: !this.state.mapsVisible})} variant="fab"
                        color="secondary" aria-label="Add"
                        className={classes.fab}>
                    {this.state.mapsVisible && <NoMapIcon/>}
                    {!this.state.mapsVisible && <MapIcon/>}
                </Button>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                       <PlaceSearcher updateProject={this.props.updateProject} project={project} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={9}>
                        {this.state.mapsVisible && <TravelMap project={project} {...defaultProps}/>}
                        {!this.state.mapsVisible && <TravelGrid updateProject={this.props.updateProject} project={project}/>}
                    </Grid>
                </Grid>
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
  updateProject
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

