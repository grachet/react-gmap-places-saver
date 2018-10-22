import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import PromptDialogue from '../components/PromptDialogue'
import AlertDialogue from '../components/AlertDialogue'


var _ = require('lodash');

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {

  state = {
    openAddContact: false,
    openAlertRemove: false,
  }

  onClickUser = (user) => {
    this.setState({openAlertRemove: true, userIdToRemove: user})
  };

  onCloseRemove = () => {
    this.setState({openAlertRemove: false})
  };

  onOKRemove = () => {
    this.setState({openAlertRemove: false});
    this.props.removeUserFromProject(this.state.userIdToRemove, this.props.project.projectId)
  };

  closeAddUser = () => {
    this.setState({openAddContact: false})
    this.props.openUsersModal(null)
  };


  onOkAddUser = (data) => {
    let user = {
      "role": data.Role,
      "mailId": data.Mail
    }
    this.setState({openAddContact: false});
    this.props.addUserToProject(user, this.props.project.projectId)
    this.props.openUsersModal(null)
  };

  onAddUser = () => {
    this.setState({openAddContact: true})
    this.props.closeUsersModal()
  };


  render() {
    const {classes, closeUsersModal, project} = this.props;

    return (
      [<Dialog key={1} onClose={closeUsersModal}
               aria-labelledby="simple-dialog-title"
               open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Users on project {project && project.rootCourseNumber}</DialogTitle>
        <div>
          <List>
            {project && _.values(project.users).map(user => (
              <ListItem button onClick={() => this.onClickUser(user.mailId)} key={user.mailId}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.mailId} secondary={user.role}/>
              </ListItem>
            ))}
            <ListItem button onClick={() => this.onAddUser()}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account"/>
            </ListItem>
          </List>
        </div>
      </Dialog>,
        <PromptDialogue
          key={2}
          open={this.state.openAddContact}
          onCancel={this.closeAddUser}
          onOk={this.onOkAddUser}
          title={"Add user on project " + (project && project.rootCourseNumber)}
          textfield={["Mail"]}
          selectfield={[{name: "Role", values: ["Developer", "Project Manager", "Designer"]}]}
        />,
        <AlertDialogue
          key={3}
          open={this.state.openAlertRemove}
          title={"Remove « " + (this.state.userIdToRemove && this.state.userIdToRemove) + " » from this project ?"}
          onClose={this.onCloseRemove}
          onOk={this.onOKRemove}
        />
      ]
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(SimpleDialog);
