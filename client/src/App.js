import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Welcome from './components/Welcome';

export default class App extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='/' exact component={Welcome}/>
      </div>
      </Router>
    );
  }
}