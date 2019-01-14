import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ROLE = [
  "Dad", "Mom", "Son", "Friend", "Daughter"
]

export default class AddUserModal extends React.Component {


  renderForm = () => {
    const {titleUsers, valuesUsers} = this.props;
    //{role,uid}
    return (
      <div>a</div>
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
          <DialogContent>
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