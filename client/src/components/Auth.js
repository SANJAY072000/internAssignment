// importing the modules
import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Welcome from './Welcome';


export default class Auth extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='*' component={Welcome}/>
      </div>
      </Router>
    );
  }
}
