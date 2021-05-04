// importing the modules
import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './auth/Login';


export default class NoAuth extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='*' exact component={Login}/>
      </div>
      </Router>
    );
  }
}
