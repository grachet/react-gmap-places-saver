import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './screens/Home'
import Setting from './screens/Setting'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setCurrentUser} from "./redux/actions/user";
import SocialButton from './containers/SocialButton';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#124191',
    },
    secondary: {
      main: '#1e88e5',
    },
  },
});

class App extends Component {

  state = {
    openSnack: false,
  };

  handleSocialLogin = (user) => {
    console.log(user)
  };

  handleSocialLoginFailure = (err) => {
    this.setState({ openSnack: true });
  };

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnack: false });
  };

  render() {

    if (true) {
      return <div>
        <SocialButton
          provider='facebook'
          appId='YOUR_APP_ID'
          onLoginSuccess={this.handleSocialLogin}
          onLoginFailure={this.handleSocialLoginFailure}
        >
          Login with Facebook
        </SocialButton>
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
          message={<span id="message-id">La connexion a échouée</span>}
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
    }

    return (
      <MuiThemeProvider theme={lightTheme}>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <Switch>
            <Route exact path='/' render={() => (<Home/>)}/>
            <Route path='/setting' component={Setting}/>
            <Route component={Home}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

