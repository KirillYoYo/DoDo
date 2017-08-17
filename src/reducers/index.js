import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import transactions from './addTransaction';
import banks from './banks';

const rootReducer = combineReducers({
	auth,
	menu,
	transactions,
	banks
});

export default rootReducer;
