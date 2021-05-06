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
      a:[],
      p:1,
      c:1
    }
  }

  async componentDidMount() {
    let token,logs;
    token=localStorage.getItem('user');
    logs=localStorage.getItem('logs');
    if(logs){
    await this.props.setDashboardData('ALL_LOGS',JSON.parse(logs));
    }
    else{
    axios({
        url:`/api/log/allLogs`,
        headers:{
        'Authorization':token
      }
      })
      .then(res=>{
        localStorage.setItem('logs',JSON.stringify(res.data));
        this.props.setDashboardData('ALL_LOGS',res.data);
      })
      .catch(err=>console.log(err));
    }
    this.task();
}

  task=async ()=>{
    let n,a1,i,a,p,c,j;
    j=2;
    a1=this.props.dashboardData.allLogs;
    n=this.props.dashboardData.allLogs.length;
    a=[];
    p=Math.ceil(n/j);
    c=this.state.c;
    for(i=j*(c-1);i<j*c;++i){
      a.push(a1[i]);
    }
    await this.setState({a:a,p:p,c:c});
  }

  ac=async i=>{
    if(i===-1&&this.state.c>1)await this.setState({c:this.state.c+i});
    if(i===1&&this.state.c<this.state.p)await this.setState({c:this.state.c+i});
    this.task();
  }

  qw=async i=>{
    await this.setState({c:i});
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
                this.state.a.map(
                  (res,i)=>{
                  if(res)
                  return(
                  <tr key={i}>
                  <td>{res.userPhone}</td>
                  <td>{res.userComment}</td>
                  </tr>);
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
                  onClick={()=>this.ac(-1)}>
                  &laquo;
                </button>
                {
                  this.props.dashboardData.allLogs.map(
                    (res,i)=>{
                    if(i+1<=this.state.p)
                    return(
                      <button
                        style={{
                          margin:"0 20px 0 0"
                        }}
                        onClick={()=>this.qw(i+1)} key={i}
                        className={this.state.c===i+1?'btn btn-success':'btn'}>
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
                  onClick={()=>this.ac(1)}>
                  &raquo;
                </button>
            </div>
            <Link to='/createLog' className='btn btn-danger'>Create a log</Link>
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
