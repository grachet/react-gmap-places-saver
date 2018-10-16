import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './screens/Home'
import Setting from './screens/Setting'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setCurrentUser} from "./redux/actions/user";
import Login from "./screens/Login"

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
    loginSuccess: false,
  };

  handleSocialLogin = (user) => {
    this.setState({loginSuccess: true});
    alert('user')
  };

  render() {

    if (!this.state.loginSuccess) {
      return <Login handleSocialLogin={this.handleSocialLogin}/>
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

