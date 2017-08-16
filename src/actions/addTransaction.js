export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const UPDATE = 'UPDATE';

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
export function updateAllTransactions(arr) {
	return {
		type: UPDATE,
		payload: {
			arr
		}
	}
}