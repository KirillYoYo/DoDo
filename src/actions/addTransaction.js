export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const UPDATE = 'UPDATE';


export function loadTransaction(transaction) {
	return {
		type: ADD,
		payload: {
			transaction
		}
	}
}

export function addTransaction(transaction) {
	return {
		type: ADD,
		payload: {
			transaction
		}
	}
}
export function removeTransaction(transactionId) {
	return {
		type: REMOVE,
		payload: {
			transactionId
		}
	}
}
export function updateAllTransactions(data) {
	return {
		type: UPDATE,
		payload: {
			data
		}
	}
}