
import {
	GET_ALL_USERS,
	GET_ALL_USERS_SUCCESS,
	UPDATE_USER,
	UPDATE_USER_SUCCESS,
	GET_ALL_USERS_FAILED,
} from '../actions/main';

const initialState = {
	users: [],
	err: null
};

export default function menu(state = initialState, action = {}) {
	switch (action.type) {
		case GET_ALL_USERS_SUCCESS:
			return {
				...state,
				users: action.payload.data
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				users: action.payload.data.users
			};
		case GET_ALL_USERS_FAILED:
			return {
				...state,
				err: action.payload
			};
		case UPDATE_USER:
			const new_arr = state.users
			new_arr.colorsArray.map((item, i) => {
				if (parseInt(item.id) === parseInt(action.payload.data.value.id)) {
					item.name =  action.payload.data.value.name
					item.description =  action.payload.data.value.description
				}
			});
			return {
				...state,
				users: new_arr
			};

		default:
			return state;
	}
}
