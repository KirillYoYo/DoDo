import {
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	FETCH_PROFILE_PENDING,
	FETCH_PROFILE_SUCCESS
} from '../actions/auth';

const initialState = {
	user: null,
	loggingIn: false,
	loggingOut: false,
	loginErrors: null
};

export default function auth(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN_PENDING:
			return Object.assign({}, initialState, {loggingIn: true});
		case LOGIN_SUCCESS:
			let user = action.payload.data;
			return Object.assign({}, state, {user: user, loggingIn: false, loginErrors: null});
		case LOGIN_FAILED:
			return {
				...state,
				loggingIn: false,
				user: null,
				loginErrors: action.payload.response.data.message
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				loggingOut: false,
				user: null,
				loginErrors: null
			};
		case FETCH_PROFILE_SUCCESS:
			return Object.assign({}, state, {user: action.payload.data, loggingIn: false, loginErrors: null});
		default:
			return state;
	}
}
