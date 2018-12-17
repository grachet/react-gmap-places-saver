import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/settingStyle'
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setMapStyle, toggleTheme} from '../redux/actions/user'
import Typography from "@material-ui/core/Typography/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Check';

class Setting extends Component {

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <Navigation/>
        <Button onClick={() => window.history.back()} variant="fab"
                color="secondary" aria-label="Add"
                className={classes.fab}>
          <SaveIcon/>
        </Button>
        <Typography variant="h4" className={classes.myl} color="textPrimary">My settings</Typography>
        {this.props.user && <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.user.darkTheme}
                onChange={() => this.props.toggleTheme()}
              />
            }
            label="Dark theme"
          />
        </FormGroup>
        }
        {this.props.user && <FormControl margin={"normal"} style={{minWidth: 150}}>
          <InputLabel htmlFor="mapStyle">Map Style</InputLabel>
          <Select
            value={this.props.user.mapStyle}
            onChange={(e) => this.props.setMapStyle(e.target.value)}
            inputProps={{
              name: 'mapStyle',
              id: 'mapStyle',
            }}
          >
            <MenuItem value={"default"}>light/dark</MenuItem>
            <MenuItem value={"basic"}>basic</MenuItem>
            <MenuItem value={"streets"}>streets</MenuItem>
            <MenuItem value={"bright"}>bright</MenuItem>
            <MenuItem value={"satellite"}>satellite</MenuItem>
          </Select>
        </FormControl>
        }
      </div>
    );
  }
}

const mapStateToProps = ({user, projects}) => {
  return {
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTheme, setMapStyle
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Setting));