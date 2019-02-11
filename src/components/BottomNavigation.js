import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import classNames from 'classnames';

const styles = {
  root: {
    zIndex: 10000,
    position: 'fixed',
    bottom: 0,
    width: "100vw",
  },
};

class SimpleBottomNavigation extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <BottomNavigation
        className={classes.root + " hideOnDesktop"}
      >
        {this.props.actions.map(action => <BottomNavigationAction onClick={action.action} label={action.name} icon={action.icon}/>)}
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);