
import {
	GET_ALL_GOODS,
	GET_ALL_GOODS_SUCCESS,
	UPDATE_USER,
	UPDATE_USER_SUCCESS,
	GET_ALL_GOODS_FAILED,
	ADD_TO_BASKET,
	ADD_TO_BASKET_SUCCESS,
	DELETE_FROM_BASKET,
	DELETE_FROM_BASKET_SUCCESS,
	UPDATE_BASKET_SUCCESS
} from '../actions/goods';

const initialState = {
	goods: [],
	basket: [],
	err: null
};


export default function goods(state = initialState, action = {}) {

	function getItem (arr, id) {
		let res = null;
		arr && arr.map((item, i) => {
			if (item.id === id) {
				res = item;
			}
		});
		if (res) {
			return res
		} else {
			throw('В массиве goods нет тавара с таким id')
		}

	}

	let basket = state.basket;

	switch (action.type) {

		case GET_ALL_GOODS_SUCCESS:
			localStorage.setItem('goods', JSON.stringify(action.payload.data));

			return {
				...state,
				goods: action.payload.data.goods
			};
		case GET_ALL_GOODS_FAILED:
			return {
				...state,
				err: action.payload
			};
		case ADD_TO_BASKET_SUCCESS:
			basket.push(getItem(state.goods, action.payload.value.id));
			localStorage.setItem('basket', JSON.stringify(basket));
			return {
				...state,
				basket: basket
			};
		case DELETE_FROM_BASKET_SUCCESS:
			let new_basket = basket.slice();
			new_basket.every(function(item, i) {
				if (item.id === action.payload.value.id) {
					new_basket.splice(i, 1);
					return false
				} else {
					return true
				}
			});
			localStorage.setItem('basket', JSON.stringify(new_basket));
			return {
				...state,
				basket: new_basket
			};
		case UPDATE_BASKET_SUCCESS:
			localStorage.setItem('basket', JSON.stringify(action.payload.value));
			return {
				...state,
				basket: action.payload.value
			};

		default:
			return state;
	}
}
