// configuring the initial state
let AccountFormState={
  userEmail:'',
  userPassword:''
};


// creating the AccountFormReducer function
const AccountFormReducer=(state=AccountFormState,action)=>{
  switch(action.type){
    case 'USER_EMAIL':
    return {
      ...state,
      userEmail:action.text
    };
    case 'USER_PASSWORD':
    return {
      ...state,
      userPassword:action.text
    };
    case 'RESET':
    return {
      ...state,
      userEmail:'',
      userPassword:''
    };
    default: return {...state};
  }
}


// exporting the function
export default AccountFormReducer;
