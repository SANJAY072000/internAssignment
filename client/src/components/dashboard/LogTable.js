import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {Link} from 'react-router-dom';

// importing the actions
import DashboardAction from '../../redux/actions/dashboard/DashboardAction';

class LogTable extends Component {

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
    let token,logs;

    token=localStorage.getItem('user');
    logs=localStorage.getItem('logs');

    // fetch logs from localStorage if data exists there
    if(logs){
    await this.props.setDashboardData('ALL_LOGS',JSON.parse(logs));
    }

    // make an API call
    else{
    axios({
        url:`/api/log/allLogs`,
        headers:{
        'Authorization':token
      }
      })
      .then(res=>{

        // save data on localStorage
        localStorage.setItem('logs',JSON.stringify(res.data));
        this.props.setDashboardData('ALL_LOGS',res.data);

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
    tmp=this.props.dashboardData.allLogs;

    // size of array
    n=this.props.dashboardData.allLogs.length;

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
            <h2>Logs Table</h2>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Phone</th>
                  <th>Comment</th>
                  </tr>
              </thead>
              <tbody>
              {
                this.state.resultsPerPage.map(
                  (res,i)=>{
                  if(res)
                  return(
                  <tr key={i}>
                  <td>{res.userPhone}</td>
                  <td>{res.userComment}</td>
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
                  this.props.dashboardData.allLogs.map(
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
            <Link to='/createLog' className='btn btn-danger'>Create Log</Link>
            </div>
      );
  }
}

// configuring state to props method
const mapStateToProps=state=>({dashboardData:state.DashboardReducer});


// configuring dispatch to props method
const mapDispatchToProps=dispatch=>({
  setDashboardData:(inputName,text)=>dispatch(DashboardAction(inputName,text))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(LogTable);
