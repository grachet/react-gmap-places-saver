import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/homeStyle'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../components/ProjectCard'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';
import {fetchProjects, removeProject, updateProject} from '../redux/actions/projects'
import PromptDialogue from '../components/PromptDialogue'
import UsersModal from '../components/UsersModal'
import NoMapIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ActionButton from "../components/ActionButton";

var _ = require('lodash');
var uniqid = require('uniqid');
var moment = require('moment');

class Home extends Component {

  state = {
    openCreateProject: false,
    openUsersModal: false,
  };

  openUsersModal = (projectId) => {
    this.setState({openUsersModal: true});
    if (projectId) {
      this.projectId = projectId;
    }
  };

  closeUsersModal = () => {
    this.setState({openUsersModal: false});
  };

  openCreateProject = () => {
    this.setState({openCreateProject: true});
  };

  closeCreateProject = () => {
    this.setState({openCreateProject: false});
  };

  onValidateCreateProject = (project) => {
    //todo
    const {uid, email, displayName} = this.props.user;
    let id = uniqid()
    this.props.updateProject({
      ...project,
      projectId: id,
      creationTimestamp: moment().format(),
      owner: uid,
      places: {},
      users: {
        [uid]: {
          "role": "Project Manager",
          uid,
          name: email || displayName,
        }
      }
    });
    this.setState({openCreateProject: false});
  }

  render() {
    const {classes, projects} = this.props;
    return (
      <div className={classes.container}>
        <Navigation/>
        <ActionButton
          mainAction={{
            icon:  <AddIcon/>,
            action: () => this.openCreateProject()
          }}
        />
        <PromptDialogue
          open={this.state.openCreateProject}
          onCancel={this.closeCreateProject}
          onOk={this.onValidateCreateProject}
          title={"New travel"}
          text={"Where do you want to go ?"}
          textfield={[{title: "Travel name", name: "travelName", validationSchema : ["string", "required"]}, {title: "Country", name: "country", validationSchema : ["string", "required"]}, {title: "Description", name: "description", multiline : true}]}
        />
        <UsersModal
          user={this.props.user}
          users={this.props.users}
          updateProject={this.props.updateProject}
          closeUsersModal={this.closeUsersModal}
          openUsersModal={this.openUsersModal}
          project={this.props.projects && this.props.projects[this.projectId]}
          open={this.state.openUsersModal}/>
        <Typography variant="display1" className={classes.myl} color="textPrimary">My travels</Typography>
        <Grid container spacing={24}>
          {projects && _.orderBy(_.values(projects), function (o) {
            return new moment(o.creationTimestamp);
          }, ['asc']).map(project => <Grid key={project.projectId} item xs={12} sm={6} md={6} lg={4} xl={3}>
            <ProjectCard
              removeProject={this.props.removeProject}
              openUsersModal={this.openUsersModal}
              project={project}/>
          </Grid>)}
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = ({user, projects, users}) => {
  return {
    projects, user, users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeProject, updateProject, fetchProjects
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

