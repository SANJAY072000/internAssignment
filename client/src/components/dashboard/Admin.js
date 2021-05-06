import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {Link} from 'react-router-dom';

// importing the actions
import AdminFormAction from '../../redux/actions/dashboard/AdminFormAction';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state={
      resultsPerPage:[],
      totalPages:1,
      currentPage:1
    }
  }

  async componentDidMount() {
    //  declare variables
    let token,allusers;

    token=localStorage.getItem('user');
    allusers=localStorage.getItem('allusers');

    let obj={};
    obj.text='';

    // fetch logs from localStorage if data exists there
    if(allusers){
      obj.users=JSON.parse(allusers);
    await this.props.setAdminData('ALL_USERS',obj);
    }

    // make an API call
    else{
    axios({
        url:`/api/update/allUsers`,
        headers:{
        'Authorization':token
      }
      })
      .then(res=>{

        // save data on localStorage
        obj.users=res.data;
        this.props.setAdminData('ALL_USERS',obj);
        localStorage.setItem('allusers',JSON.stringify(res.data));
        // console.log(this.props.adminData.allUsers,obj);
        // console.log(res.data);

      })
      .catch(err=>console.log(err));
}
    this.task();
}

  task=async ()=>{
    // declare variables
    let n,tmp,i,resultsPerPage,totalPages,currentPage,noOfResultsPerPage;

    // number of logs per page (10 logs per page)
    noOfResultsPerPage=10;

    // copy logs into temp array
    tmp=this.props.adminData.allUsers;

    // size of array
    n=this.props.adminData.allUsers.length;

    // denotes logs in each page
    resultsPerPage=[];

    // get total pages required
    totalPages=Math.ceil(n/noOfResultsPerPage);

    // current active page
    currentPage=this.state.currentPage;

    // populate all logs in resultsPerPage array
    for(
      i=noOfResultsPerPage*(currentPage-1);
    i<noOfResultsPerPage*currentPage;
    ++i
  ){
      resultsPerPage.push(tmp[i]);
    }

    // set the state
    await this.setState({resultsPerPage:resultsPerPage,totalPages:totalPages,
      currentPage:currentPage});

  }

// working of arrow buttons
  arrowButtons=async i=>{
    if(
      i===-1
      &&
      this.state.currentPage>1
    )
    await this.setState({currentPage:this.state.currentPage+i});

    if(
      i===1
      &&
      this.state.currentPage<this.state.totalPages
    )
    await this.setState({currentPage:this.state.currentPage+i});

    this.task();
  }

// working of page number buttons
  pageButtons=async i=>{
    await this.setState({currentPage:i});
    this.task();
  }

  render() {
      return (
            <div style={{maxWidth:'75%',margin:"75px auto"}}>

            <div className='text-center m-5'>
            <h2>Users Table</h2>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  </tr>
              </thead>
              <tbody>
              {
                this.state.resultsPerPage.map(
                  (res,i)=>{
                  if(res)
                  return(
                  <tr key={i}>
                  <td>{res.userName}</td>
                  <td>{res.userEmail}</td>
                  </tr>
                );
                  else return <tr key={i}></tr>;
                })
              }
              </tbody>
            </table>

            <div style={{
                  margin: "50px 0",
                  display: "flex",
                  justifyContent: "left",
                }}>
                <button
                  style={{
                    borderBottomLeftRadius: "5px",
                    borderTopLeftRadius: "5px",
                    margin:"0 20px 0 0"
                  }}
                  onClick={()=>this.arrowButtons(-1)}>
                  &laquo;
                </button>
                {
                  this.props.adminData.allUsers.map(
                    (res,i)=>{
                    if(i+1<=this.state.totalPages)
                    return(
                      <button
                        style={{
                          margin:"0 20px 0 0"
                        }}
                        onClick={()=>this.pageButtons(i+1)} key={i}
                        className={this.state.currentPage===i+1?'btn btn-success':'btn'}>
                        {i+1}
                      </button>
                    );
                    else return <div key={i}></div>
                  })
                }
                <button
                  style={{
                    borderBottomLeftRadius: "5px",
                    borderTopLeftRadius: "5px",
                    margin:"0 20px 0 0"
                  }}
                  onClick={()=>this.arrowButtons(1)}>
                  &raquo;
                </button>
            </div>
            <Link to='/createUser' className='btn btn-danger'>Create User</Link>
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
export default connect(mapStateToProps,mapDispatchToProps)(Admin);
