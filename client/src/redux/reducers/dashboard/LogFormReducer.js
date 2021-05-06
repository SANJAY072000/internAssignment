// configuring the initial state
let LogFormState={
  userPhone:'',
  userComment:''
};


// creating the LogFormReducer function
const LogFormReducer=(state=LogFormState,action)=>{
  switch(action.type){
    case 'USER_PHONE':
    return {
      ...state,
      userPhone:action.text
    };
    case 'USER_COMMENT':
    return {
      ...state,
      userComment:action.text
    };
    case 'RESET':
    return {
      ...state,
      userPhone:'',
      userComment:''
    };
    default: return {...state};
  }
}


// exporting the function
export default LogFormReducer;
