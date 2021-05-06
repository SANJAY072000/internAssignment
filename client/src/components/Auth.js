// importing the modules
import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LogTable from './dashboard/LogTable';
import CreateLog from './dashboard/CreateLog';


export default class Auth extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='/dashboard' component={LogTable}/>
      <Route path='/createLog' component={CreateLog}/>
      </div>
      </Router>
    );
  }
}
