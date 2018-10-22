import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default class FormDialog extends React.Component {

  onOk = () => {
    this.props.onOk({...this.field, ...this.state.selectValues});
  }

  constructor(props) {
    super(props);
    this.field = {};
    let newState = {selectValues: {}};
    this.props.selectfield && this.props.selectfield.forEach((field, index) => {
      newState = {...newState, selectValues: {...newState.selectValues, [field.name]: field.values[0]}}
    });
    this.state = newState;
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
            <DialogContentText>
              {this.props.text}
            </DialogContentText>
            {
              this.props.textfield && this.props.textfield.map(field => <TextField
                  key={field}
                  margin="dense"
                  id={field}
                  label={field}
                  type="text"
                  fullWidth
                  onChange={(e) => this.field[field] = e.target.value}
                />
              )
            }
            {
              this.props.selectfield && this.props.selectfield.map(field =>
                <FormControl   key={field} style={{width: 150}}>
                  <InputLabel
                    htmlFor={field.name}>{field.name}</InputLabel>
                  <Select
                    value={this.state.selectValues[field.name]}
                    onChange={(e) => {
                      this.setState({selectValues: {...this.state.selectValues, [field.name]: e.target.value}})
                    }}
                    displayEmpty
                    inputProps={{
                      name: field.name,
                      id: field.name,
                    }}
                  >
                    {field.values.map(value =>
                      <MenuItem key={value} value={value}>{value}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              )
            }

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