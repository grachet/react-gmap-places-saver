import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


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
  containerTravelGrid:{
    backgroundColor: "blue",
    flexGrow: 1,
  }
};

class MenuAppBar extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.containerTravelGrid}></div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
