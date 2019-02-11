import React, {Component} from 'react';
import styles from './styles/projectCardStyle'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AlertDialogue from "./AlertDialogue";
import {Link} from "react-router-dom";

var moment = require('moment');

class PlaceCard extends Component {

  state = {
    openAlertDeleteProject: false
  };


  onCloseDeleteProject = () => {
    this.setState({openAlertDeleteProject: false})
  };

  onOpenDeleteProject = () => {
    this.setState({openAlertDeleteProject: true})
  };

  onOKDeleteProject = () => {
    this.setState({openAlertDeleteProject: false});
    const {project, place} = this.props;
    let newProject = {...project}
    delete newProject.places[place.pid]
    this.props.updateProject(newProject)
  };


  render() {

    const {classes, place,goToPlace} = this.props;
    return (
      <Card>
        <CardActionArea
                        onClick={() => goToPlace(place)}
                        className={classes.wmax}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {place.name || place.properties.city}
            </Typography>
            <Typography gutterBottom component="p">
              {place.name && place.properties.city ? place.properties.city + " - " + place.properties.country : place.properties.country}
            </Typography>
            <Typography gutterBottom component="p">
              {place.description}
            </Typography>
            <Typography component="p">
              Arrival : {moment(place.arrival).format("ddd, MMM Do")}
            </Typography>
            <Typography component="p">
              Departure : {moment(place.departure).format("ddd, MMM Do")}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={() => this.onOpenDeleteProject()} color="primary">
            <span className={classes.mrs}>Remove</span>
          </Button>
        </CardActions>
        <AlertDialogue
          open={this.state.openAlertDeleteProject}
          title={"Delete the project « " + (place.name) + " » ?"}
          onClose={this.onCloseDeleteProject}
          onOk={this.onOKDeleteProject}
        />
      </Card>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PlaceCard);