import React, {Component} from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home'
import Setting from '../screens/Login'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Login from '../screens/Login'
import {connect} from 'react-redux';
import {setCurrentUser} from "../redux/actions/user";
import {bindActionCreators} from "redux";

import {getAllProjects} from "../redux/actions/projects";
import {color} from '../data/color'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
    console.log('user', user._profile)
    switch (user._provider) {
      case "google":
        this.props.setCurrentUser({
          id : user._profile.id,
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
        })
        break;
      case "facebook":
        this.props.setCurrentUser({
          id : user._profile.id,
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
      })
        break;
      case "linkedin":
        this.props.setCurrentUser({
          id : user._profile.id,
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
        })
        break;

    }
  };

  componentDidMount() {
    this.props.getAllProjects();
  }


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

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser, getAllProjects
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

