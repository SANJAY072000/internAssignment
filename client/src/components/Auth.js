// importing the modules
import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LogTable from './dashboard/LogTable';


export default class Auth extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='/dashboard' component={LogTable}/>
      </div>
      </Router>
    );
  }
}
