// configuring the initial state
let AdminFormState={
  allUsers:[],
  userName:'',
  userEmail:'',
  userPassword:'',
  userAdmin:'',
};

// creating the AdminFormReducer function
const AdminFormReducer=(state=AdminFormState,action)=>{
  switch(action.type){
    case 'USER_NAME':
    return {
      ...state,
      userName:action.data.text
    };
    case 'USER_EMAIL':
    return {
      ...state,
      userEmail:action.data.text
    };
    case 'USER_PASSWORD':
    return {
      ...state,
      userPassword:action.data.text
    };
    case 'USER_ADMIN':
    return {
      ...state,
      userAdmin:action.data.text
    };
    case 'ALL_USERS':
    return {
      ...state,
      allUsers:action.data.users
    };
    case 'RESET':
    return {
      ...state,
      userName:'',
      userEmail:'',
      userPassword:''
    };
    default: return {...state};
  }
}


// exporting the function
export default AdminFormReducer;
