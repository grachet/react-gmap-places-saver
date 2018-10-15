
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Navigation from '../containers/Navigation'

export default class Home extends Component {

  render() {

    return (
      <div>
        <Navigation/>
        <Link to={"/setting"}>
          <Button variant="contained" color="primary">
            to setting
          </Button>
        </Link>
      </div>
    );
  }
};
