// importing the required modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


// importing the actions
import LogFormAction from '../../redux/actions/dashboard/LogFormAction';


class CreateLog extends Component {

  constructor(props){
      super(props);
      this.onChange=this.onChange.bind(this);
      this.createLog=this.createLog.bind(this);
    }

    saveData=(inputName,text)=>this.props.setLogData(inputName,text)

    onChange=e=>this.saveData(e.target.getAttribute('name'),e.target.value);

    createLog=(e)=>{
       e.preventDefault();
       let {userPhone, userComment}=this.props.logData;
       if(userPhone===''||userComment==='')alert("Enter all the fields");
       else{
       axios({
           url:`/api/log/create`,
           method:'POST',
           data:this.props.logData,
           headers:{
             'Authorization':localStorage.getItem('user')
           }
         })
         .then(res=>{
           this.props.history.replace('/dashboard');
           axios({
               url:`/api/log/allLogs`,
               headers:{
               'Authorization':localStorage.getItem('user')
             }
             })
             .then(res=>{
               localStorage.setItem('logs',JSON.stringify(res.data));
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
            <span className='hle mr-3'>Create Logs</span>
            </h4>
          </div>
        </div>

        <form className='p-5 mt-5 hlfm border rounded' onSubmit={this.createLog}>
            <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Phone</label>
                  <input type="text"
                    className="form-control"
                    name="USER_PHONE" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone" onChange={this.onChange}/>
            </div>

        <div className="form-group my-5">
              <label htmlFor="exampleInputPassword1">Comment</label>
              <input type="text" className="form-control" name="USER_COMMENT"
              id="exampleInputPassword1" placeholder="Enter Comment" onChange={this.onChange}/>
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
const mapStateToProps=state=>({logData:state.LogFormReducer});


// configuring dispatch to props method
const mapDispatchToProps=dispatch=>({
  setLogData:(inputName,text)=>dispatch(LogFormAction(inputName,text))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(CreateLog);
