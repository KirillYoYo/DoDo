import _ from 'lodash';

import {
	GET_ALL_BANKS,
	GET_ALL_BANKS_SUCCESS,
} from '../actions/banks';

const initialState = {
	banks: []
};

export default function menu(state = initialState, action = {}) {
	switch (action.type) {
		case GET_ALL_BANKS_SUCCESS:
			return {
				...state,
				banks: action.payload.data.banks
			};

		default:
			return state;
	}
}
