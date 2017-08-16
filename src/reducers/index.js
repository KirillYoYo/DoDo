import { combineReducers } from 'redux';
import auth from './auth';
import menu from './menu';
import transactions from './addTransaction';

const rootReducer = combineReducers({
  auth,
  menu,
  transactions
});

export default rootReducer;
