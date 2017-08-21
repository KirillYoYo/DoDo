import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import transactions from './addTransaction';
import banks from './banks';
import users from './Main';

const rootReducer = combineReducers({
	auth,
	menu,
	transactions,
	banks,
	users
});

export default rootReducer;
