import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Button from "@material-ui/core/Button/Button";

const styles = {
  speedDial: {
    position: 'fixed',
    bottom: 60,
    right: 60,
  },
}

class SpeedDialTooltipOpen extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {
    const {classes, mainAction, actions} = this.props;
    const {hidden, open} = this.state;

    if (!actions) {
      return <Button onClick={() => mainAction.action()} variant="fab" color="secondary" aria-label="Save"
                     className={classes.speedDial + " hideOnPrint"}
      >
        {mainAction.icon}
      </Button>
    }

    return (
      <SpeedDial
        key={1}
        ariaLabel="speedDial"
        className={classes.speedDial + " hideOnPrint"}
        hidden={hidden}
        icon={this.props.mainAction.icon}
        onBlur={this.handleClose}
        onClick={() => this.props.mainAction.action()}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
      >
        {this.props.actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              this.handleClick();
              action.action()
            }}
          />
        ))}
      </SpeedDial>
    );
  }
}

SpeedDialTooltipOpen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeedDialTooltipOpen);
