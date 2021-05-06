// configuring the initial state
let DashboardState={
  allLogs:[]
};


// creating the DashboardReducer function
const DashboardReducer=(state=DashboardState,action)=>{
  switch(action.type){
    case 'ALL_LOGS':
    return {
      ...state,
      allLogs:action.text
    };
    default: return {...state};
  }
}


// exporting the function
export default DashboardReducer;
