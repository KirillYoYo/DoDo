import api from '../api'

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';


export function getAllUsers() {
	return {
		type: GET_ALL_USERS,
	}
}

export function updateUser(value) {
	return {
		type: UPDATE_USER,
		payload: {
			data: {
				value
			}
		}
	}
}
