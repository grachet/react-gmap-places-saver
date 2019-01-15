import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserSearcher from './UserSearcher'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ROLE = [
  "Dad", "Mom", "Son", "Friend", "Daughter"
]

export default class AddUserModal extends React.Component {

  state = {
    uid: null,
    role: null
  };

  handleChange = event => {
    this.setState({role: event.target.value});
  };

  onOk = () => {
    const {role, uid} = this.state;
    if (role && uid) {
      this.props.onCancel();
      this.props.onOk({role, uid});
    }
  }

  renderForm = () => {
    const {titleUsers, valuesUsers} = this.props;

    let users = titleUsers.map((user, i) => {
      return {title: user, value: valuesUsers[i]}
    })

    return (
      <div>
        <UserSearcher
          setUser={(uid) => this.setState({uid})}
          users={users}
        />
        <FormControl margin={"normal"} style={{minWidth: 200}}>
          <InputLabel htmlFor="role-select" shrink={this.state.role}>Role</InputLabel>
          <Select
            value={this.state.role}
            onChange={this.handleChange}
            inputProps={{
              name: 'role',
              id: 'role-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              ROLE.map(role => <MenuItem value={role}>{role}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>
    )
  }

  render() {

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent style={{height: 230}}>
            {this.renderForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.onOk()} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}