
export const FETCH_PROFILE_PENDING = 'FETCH_PROFILE_PENDING';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


export function login(user, password) {
	return {
		type: 'LOGIN',
		payload: {
			data: {
				user: user,
				password: password
			}
		}
	}
}

export function logout() {

	return {
		type: 'LOGOUT',
	}
}
