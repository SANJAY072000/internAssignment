// importing the required modules
import {combineReducers} from 'redux';


// importing the reducers
import AccountFormReducer from './auth/AccountFormReducer';
import DashboardReducer from './dashboard/DashboardReducer';


// exporting the combined reducer
export default combineReducers({
  AccountFormReducer,DashboardReducer
});
