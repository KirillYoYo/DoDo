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
export function getAllGoods () {
	return Promise.resolve(	api.get('/goods') );
}

export function AddToBasket () {
	return 'ADD_TO_BASKET_SUCCESS'
}
export function DeleteFromBasket () {
	return 'DELETE_FROM_BASKET_SUCCESS'
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
export function* fetchAllGoods() {
	try {
		//const goods = yield call(getAllGoods);
		yield put({type: 'GET_ALL_GOODS_SUCCESS', payload: yield call(getAllGoods)});
	} catch(error) {
		yield put({type: 'GET_ALL_GOODS_FAILED', error});
	}
}
export function * fetchAddToBasket (action) {
	yield put({type: 'ADD_TO_BASKET_SUCCESS', payload: action.payload});
}
export function * fetchDeleteFromBasket (action) {
	yield put({type: 'DELETE_FROM_BASKET_SUCCESS', payload: action.payload});
}
export function * fetchUpdateBasket (action) {
	yield put({type: 'UPDATE_BASKET_SUCCESS', payload: action.payload});
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
function* watchAllGoods() {
	yield takeEvery("GET_ALL_GOODS", fetchAllGoods);
}
function* watchAddToBasket() {
	yield takeEvery("ADD_TO_BASKET", fetchAddToBasket);
}
function* watchDeleteFromBasket() {
	yield takeEvery("DELETE_FROM_BASKET", fetchDeleteFromBasket);
}
function* watchUpdateBasket() {
	yield takeEvery("UPDATE_BASKET", fetchUpdateBasket);
}

export default function* rootSaga() {
	yield all([
		watchAllMenu(),
		watchLogout(),
		watchLogin(),
		watchAllGoods(),
		watchAddToBasket(),
		watchDeleteFromBasket(),
		watchUpdateBasket(),
	])
}