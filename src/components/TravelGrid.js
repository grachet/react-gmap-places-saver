import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import PlaceCard from "./PlaceCard"

var _ = require('lodash');
var moment = require('moment');

const styles = {
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 60
  },
  title: {
    textDecoration: 'none',
    flexGrow: 1,
  },
  containerTravelGrid: {
    paddingLeft: 20,
    paddingRight : 20,
    marginTop: 100,
    flexGrow: 1,
  },
};

class TravelGrid extends React.Component {

  render() {
    const {classes, project, updateProject} = this.props;

    return (
      <Grid container className={classes.containerTravelGrid} spacing={24}>
        {project && project.places && _.orderBy(_.values(project.places), function (o) {
          return new moment(o.arrival);
        }, ['asc']).map(place => <Grid key={project.projectId} item xs={12} sm={6} md={6} lg={4} xl={3}>
          <PlaceCard updateProject={updateProject} project={project} place={place}/>
        </Grid>)}
      </Grid>
    );
  }
}

TravelGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TravelGrid);
