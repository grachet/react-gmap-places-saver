import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LightIcon from '@material-ui/icons/Opacity';
import HighlightOff from '@material-ui/icons/HighlightOff';
import SettingsIcon from '@material-ui/icons/Settings';
import Logo from '@material-ui/icons/PinDrop';
import styles from '../components/styles/navigationStyle'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {signOut, toggleTheme} from "../redux/actions/user"
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class MenuAppBar extends React.Component {

  render() {
    const {classes, user} = this.props;

    return (

      <AppBar position="fixed">
        <Toolbar>
          <Logo/>

          <Typography to={"/"}
                      component={Link} variant="title" color="inherit" className={classes.title}>
            Maps
          </Typography>

          <Typography variant="title" color="inherit" className={classes.title}>
            <span className={"hideOnMobile"}>{this.props.title}</span>
          </Typography>


          <Typography variant="subheading" color="inherit">
            <span className={"hideOnMobile"}>{user.isAnonymous ? "Anonymous" : user.displayName}</span>
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => this.props.signOut()}
          >
            <HighlightOff/>
          </IconButton>
          <IconButton
            to={"/setting"}
            component={Link}
            color="inherit"
          >
            <SettingsIcon/>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => this.props.toggleTheme()}
          >
            <LightIcon/>
          </IconButton>

        </Toolbar>
      </AppBar>

    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user, projects}) => {
  return {
    user,
    projects: projects
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTheme, signOut
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar));
