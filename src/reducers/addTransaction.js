import {
	ADD,
	REMOVE,
	UPDATE,
} from '../actions/addTransaction';

const initialState = {
	transactions: [],
	transactionsNewId: 0
};

export default function auth(state = initialState, action = {}) {
	let new_items = state.transactions;

	switch (action.type) {
		case ADD:
			new_items.push( action.payload.transaction);

			return {
				...state,
				transactions: new_items,
				transactionsNewId: state.transactionsNewId + 1
			};
		case REMOVE:
			//new_items.push( action.payload.transaction);
			new_items.map((item, i) => {
				if (item.idTransaction === action.payload.transactionId) {
					new_items.splice(i, 1)
				}
			})

			return {
				...state,
				transactions: new_items
			};

		case UPDATE:
			return {
				...state,
				transactions: action.payload.data
			};

		default:
			return state;
	}
}