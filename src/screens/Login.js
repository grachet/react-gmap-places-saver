import SocialButton from '../containers/SocialButton';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {
  FaGithub as GitHubIcon,
  FaFacebookF as FacebookIcon,
  FaGoogle as GoogleIcon,
  FaLinkedinIn as LinkedInIcon
} from 'react-icons/fa';
import {withStyles} from "@material-ui/core";
import styles from './styles/loginStyle'
import Paper from '@material-ui/core/Paper';
import UsersModal from "../components/UsersModal";


class Home extends Component {

  state = {
    openSnack: false,
    error: 'Connexion error',
  };

  handleSocialLoginFailure = (err) => {
    this.setState({openSnack: true, error: 'Error : ' + err});
  };

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openSnack: false});
  };


  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paperContainer} elevation={2}>
          <Typography variant="display1" className={classes.loginTitle} color="textPrimary">Maps Saver</Typography>
          <Typography variant="subheading" className={classes.loginSubtitle} color="textPrimary">By Guillaume Rachet</Typography>
          <SocialButton
            color={"#3b5998"}
            provider='facebook'
            appId='1196303573854713'
            onLoginSuccess={this.props.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            <FacebookIcon className={classes.icon}/> Facebook
          </SocialButton>
          <SocialButton
            color={"#DF4B37"}
            provider='google'
            appId='503226279920-oj6fvc708ggp8njov9fhksn20l4ham6q.apps.googleusercontent.com'
            onLoginSuccess={this.props.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            <GoogleIcon className={classes.icon}/> Google
          </SocialButton>
          <SocialButton
            color={"#0D77B7"}
            provider='linkedin'
            appId='86sph2qy1tud5w'
            onLoginSuccess={this.props.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            <LinkedInIcon className={classes.icon}/> LinkedIn
          </SocialButton>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>{this.state.error}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={"closeSnack"}
              onClick={this.handleCloseSnack}
            >
              <CloseIcon/>
            </IconButton>
          }
        />
      </div>
    );
  }
};

export default withStyles(styles)(Home);