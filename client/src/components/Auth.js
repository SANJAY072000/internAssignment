// importing the modules
import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LogTable from './dashboard/LogTable';
import CreateLog from './dashboard/CreateLog';
import Admin from './dashboard/Admin';
import CreateUser from './dashboard/CreateUser';


export default class Auth extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='/dashboard' component={LogTable}/>
      <Route path='/createLog' component={CreateLog}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/createUser' component={CreateUser}/>
      </div>
      </Router>
    );
  }
}
