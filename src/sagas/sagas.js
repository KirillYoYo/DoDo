import { put, takeEvery , call, take, all, takeLatest} from 'redux-saga/effects'
import api from '../api'


function getMenuApi () {
	return Promise.resolve(	api.get('/menu') );
}
function getLogin (payload) {
	return Promise.resolve(	api.put('/login', {
			data: payload
		}) );
}
function getLogout () {
	return Promise.resolve(	api.get('/logout') );
}
function getAllBanks () {
	return Promise.resolve(	api.get('/banks') );
}



export function* fetchAllMenu() {
	try {
		const menu = yield call(getMenuApi);
		yield put({type: 'GET_ALL_MENU_SUCCESS', payload: menu});
	} catch(error) {
		yield put({type: 'GET_ALL_MENU_FAILED', error});
	}
}

export function* fetchLogin(action) {
	try {
		const login = yield call(getLogin, action.data);
		yield put({type: 'LOGIN_SUCCESS', payload: login});
	} catch(error) {
		yield put({type: 'LOGIN_FAILED', error});
	}
}
export function* fetchLogout() {
	try {
		const menu = yield call(getLogout);
		yield put({type: 'LOGOUT_SUCCESS', payload: menu});
	} catch(error) {
		yield put({type: 'LOGOUT_FAILED', error});
	}
}
export function* fetchAllBanks() {
	try {
		const menu = yield call(getAllBanks);
		yield put({type: 'GET_ALL_BANKS_SUCCESS', payload: menu});
	} catch(error) {
		yield put({type: 'GET_ALL_BANKS_FAILED', error});
	}
}

/*watches*/
function* watchLogin() {
	yield takeEvery("LOGIN", fetchLogin);
}
function* watchAllMenu() {
	yield takeEvery("GET_ALL_MENU", fetchAllMenu);
}
function* watchLogout() {
	yield takeEvery("LOGOUT", fetchLogout);
}
function* watchAllBanks() {
	yield takeEvery("GET_ALL_BANKS", fetchAllBanks);
}

export default function* rootSaga() {
	yield all([
		watchAllMenu(),
		watchLogout(),
		watchLogin(),
		watchAllBanks(),
	])
}