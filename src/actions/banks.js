import api from '../api'

export const GET_ALL_BANKS = 'GET_ALL_BANKS';
export const GET_ALL_BANKS_SUCCESS = 'GET_ALL_BANKS_SUCCESS';


export function getAllBanks() {
	return {
		type: GET_ALL_BANKS,
		payload: {
			promise: api.get('/banks')
		}
	}
}
