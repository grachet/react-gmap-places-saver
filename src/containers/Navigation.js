import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";

import {connect} from 'react-redux';
import {setCurrentUser} from "../redux/actions/user";

import {getAllProjects} from "../redux/actions/project";


const styles = {
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 60
  },
  title: {
    textDecoration: 'none',
  }
};

class MenuAppBar extends React.Component {

  render() {
    const {classes, currentUser} = this.props;

    return (

      <AppBar position="fixed">
        <Toolbar>
          <img src={'/img/nokia_logo.png'} className={classes.logo}/>

          <Typography to={"/"}
                      component={Link} variant="title" color="inherit" className={[classes.grow, classes.title]}>

            Training Development Plan
          </Typography>


          <Typography variant="subheading" color="inherit">
           {currentUser}{this.props.projects.project}
          </Typography>
          <IconButton
            to={"/setting"}
            component={Link}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
          <IconButton
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>

        </Toolbar>
      </AppBar>

    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user,project}) => {
  return {
    currentUser: user,
    projects: project
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user))
    },
    getAllProjects: () => {
      dispatch(getAllProjects())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar));
