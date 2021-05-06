// importing the required modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


// importing the actions
import AdminFormAction from '../../redux/actions/dashboard/AdminFormAction';


class CreateUser extends Component {

  constructor(props){
      super(props);
      this.onChange=this.onChange.bind(this);
      this.createUser=this.createUser.bind(this);
    }

    saveData=(inputName,obj)=>this.props.setAdminData(inputName,obj)

    onChange=e=>{
      let obj={};
      obj.users=[];
      if(e.target.getAttribute('name')==='USER_ADMIN'){
        if(e.target.checked)obj.text='a';
        else obj.text='';
      }
      else obj.text=e.target.value;
      // console.log(obj.text);
      this.saveData(e.target.getAttribute('name'),obj);
    }

    createUser=(e)=>{
       e.preventDefault();
       let {userName, userEmail, userPassword}=this.props.adminData;
       if(userName===''||userEmail===''||userPassword==='')alert("Enter all the fields");
       else{
       axios({
           url:`/api/auth/user/register`,
           method:'POST',
           data:this.props.adminData
         })
         .then(res=>{
           this.props.history.replace('/admin');
           axios({
               url:`/api/update/allUsers`,
               headers:{
               'Authorization':localStorage.getItem('user')
             }
             })
             .then(res=>{
               localStorage.setItem('allusers',JSON.stringify(res.data));
               window.location.reload();
             })
             .catch(err=>console.log(err));
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
            <span className='hle mr-3'>Create Users</span>
            </h4>
          </div>
        </div>

        <form className='p-5 mt-5 hlfm border rounded' onSubmit={this.createUser}>
            <div className="form-group mb-5">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input type="text"
                    className="form-control"
                    name="USER_NAME" placeholder="Enter Name"
                    onChange={this.onChange}/>
            </div>
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

        <div className="input-group mb-3">
  <div className="input-group-text">
    <input className="form-check-input mt-0" type="checkbox" name="USER_ADMIN" aria-label="Checkbox for following text input" onChange={this.onChange}/>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox"
  placeholder="Admin"/>
</div>

          <button type="submit" className="mt-5 btn btn-block edibt rounded-0">
          Create </button>

</form>
      </div>
    </div>
    );
  }
}


// configuring state to props method
const mapStateToProps=state=>({adminData:state.AdminFormReducer});


// configuring dispatch to props method
const mapDispatchToProps=dispatch=>({
  setAdminData:(inputName,data)=>dispatch(AdminFormAction(inputName,data)),
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser);
