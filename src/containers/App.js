import React, {Component} from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home'
import Setting from '../screens/Setting'
import Travel from '../screens/Travel'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Login from '../screens/Login'
import {connect} from 'react-redux';
import {setCurrentUser} from "../redux/actions/user";
import {bindActionCreators} from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {getUserProjects} from "../redux/actions/projects";
import {color} from '../data/color'





class App extends Component {



  state = {
    loginSuccess: false,
  };

  handleSocialLogin = (user) => {
    this.setState({loginSuccess: true});
    switch (user._provider) {
      case "google":
        this.props.setCurrentUser({
          _id : user._profile.id,
          docType: "user",
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
        })
        break;
      case "facebook":
        this.props.setCurrentUser({
          _id : user._profile.id,
          docType: "user",
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
      })
        break;
      case "linkedin":
        this.props.setCurrentUser({
          docType: "user",
          _id : user._profile.id,
          mailId: user._profile.email,
          firstName: user._profile.firstName,
          lastName: user._profile.lastName,
        })
        break;
    }
    this.props.getUserProjects(user._profile._id);
  };


  render() {

    const darkTheme =  createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: color.containerBackground,
        },
        secondary: {
          main: color.accent,
        },
      },
    })

    const lightTheme = createMuiTheme({
      palette: {
        type: "light",
        primary: {
          main: color.containerBackground,
        },
        secondary: {
          main: color.accent,
        },

      },
    });

    if (!this.state.loginSuccess) {
      return <Login handleSocialLogin={this.handleSocialLogin}/>
    }

    return (
      <MuiThemeProvider theme={this.props.user && this.props.user.lightTheme ? lightTheme : darkTheme}>
        <CssBaseline />
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <Switch>
            <Route exact path='/' render={() => (<Home/>)}/>
            <Route path='/setting' component={Setting}/>
            <Route path='/travel/:id' component={Travel}/>
            <Route component={Home}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser, getUserProjects
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

