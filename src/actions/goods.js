import api from '../api'

export const GET_ALL_GOODS = 'GET_ALL_GOODS';
export const GET_ALL_GOODS_SUCCESS = 'GET_ALL_GOODS_SUCCESS';
export const GET_ALL_GOODS_FAILED = 'GET_ALL_GOODS_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const ADD_TO_BASKET_SUCCESS = 'ADD_TO_BASKET_SUCCESS';
export const DELETE_FROM_BASKET = 'DELETE_FROM_BASKET';
export const DELETE_FROM_BASKET_SUCCESS = 'DELETE_FROM_BASKET_SUCCESS';

export const UPDATE_BASKET = 'UPDATE_BASKET';
export const UPDATE_BASKET_SUCCESS = 'UPDATE_BASKET_SUCCESS';


export function getAllGoods() {
	return {
		type: GET_ALL_GOODS,
	}
}

export function deleteFromBasket(value) {
	return {
		type: DELETE_FROM_BASKET,
		payload: {
			value
		}
	}
}
export function addToBasket(value) {
	return {
		type: ADD_TO_BASKET,
		payload: {
			value
		}
	}
}
export function updateBasket(value) {
	return {
		type: UPDATE_BASKET,
		payload: {
			value
		}
	}
}


