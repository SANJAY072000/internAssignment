// importing the required modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


// importing the actions
import AccountFormAction from '../../redux/actions/auth/AccountFormAction';


class Login extends Component {

  constructor(props){
      super(props);
      this.onChange=this.onChange.bind(this);
      this.loginAccount=this.loginAccount.bind(this);
    }

    saveData=(inputName,text)=>this.props.setAccountData(inputName,text)

    onChange=e=>this.saveData(e.target.getAttribute('name'),e.target.value);

    loginAccount=(e)=>{
       e.preventDefault();
       let {userEmail, userPassword}=this.props.accountData;
       if(userEmail===''||userPassword==='')alert("Enter all the fields");
       else{
       axios({
           url:`/api/auth/user/login`,
           method:'POST',
           data:this.props.accountData,
         })
         .then(res=>{
           if(res.data.userNotRegistered==='User is not registered')
           alert("You are not registered");
           else if(res.data.passwordIncorrect==='Password is incorrect')
           alert("Password is incorrect");
           else{
           localStorage.setItem('user',res.data.token);
           this.props.setAccountData("RESET",'');
           this.props.history.push('/dashboard');
           window.location.reload();
           }
         })
         .catch(err=>console.log(err));
       }
    }

  render(){
    return(
      <div className='mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h4 className='font-weight-bolder text-center text-uppercase'>
            <span className='hle mr-3'>login here</span>
            </h4>
          </div>
        </div>

        <form className='p-5 mt-5 hlfm border rounded' onSubmit={this.loginAccount}>
            <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="email"
                    className="form-control"
                    name="USER_EMAIL" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" onChange={this.onChange}/>
            </div>

        <div className="form-group my-5">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" name="USER_PASSWORD"
              id="exampleInputPassword1" placeholder="Enter Password" onChange={this.onChange}/>
        </div>
          <button type="submit" className="mt-5 btn btn-block edibt rounded-0">
          Login Here </button>

</form>
      </div>
    </div>
    );
  }
}


// configuring state to props method
const mapStateToProps=state=>({accountData:state.AccountFormReducer});


// configuring dispatch to props method
const mapDispatchToProps=dispatch=>({
  setAccountData:(inputName,text)=>dispatch(AccountFormAction(inputName,text))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(Login);
