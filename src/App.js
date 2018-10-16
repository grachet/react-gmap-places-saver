import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './screens/Home'
import Setting from './screens/Setting'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setCurrentUser} from "./redux/actions/user";
import Login from "./screens/Login"
import {color} from './const/color'

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: color.containerBackground,
    },
    secondary: {
      main: color.accent,
    },
  },
});

class App extends Component {

  state = {
    loginSuccess: false,
  };

  handleSocialLogin = (user) => {
    this.setState({loginSuccess: true});
    console.log('user', user)
    switch (user._provider) {
      case "google":
        console.log("google");
        break;
      case "facebook":
        console.log("facebook");
        break;
      case "linkedin":
        console.log("linkedin");
        break;

    }

  };

  render() {

    if (!this.state.loginSuccess) {
      return <Login handleSocialLogin={this.handleSocialLogin}/>
    }

    return (
      <MuiThemeProvider theme={theme}>
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

