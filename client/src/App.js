// importing the modules
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import Auth from './components/Auth';
import NoAuth from './components/NoAuth';


// importing the store
import Store from './redux/store/Store';


export default class App extends Component {
  render(){
    let user=0;
    if(localStorage.getItem('user'))user=1;
    return(
    <Provider store={Store}>
      {
        user?(
        <Auth/>
      ):(
      <NoAuth/>
    )
  }
    </Provider>
    )
  }
}
