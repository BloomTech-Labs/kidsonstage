import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000'; //change this line

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
	return {
		type: AUTHENTICATION_ERROR,
		payload: error
	};
};

export const register = (username, password, confirmPassword, history) => {
	return dispatch => {
		if (password !== confirmPassword) {
			dispatch(authError('Passwords do not match'));
			return;
		}
		axios
			.post(`${ROOT_URL}/users`, { username, password })
			.then(() => {
				dispatch({
					type: USER_REGISTERED
				});
				history.push('/signin');
			})
			.catch(err => {
				console.log(err);
				dispatch(authError('Failed to register user'));
			});
	};
};

export const login = (username, password, history) => {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/login`, { username, password })
			.then(response => {
				localStorage.setItem('token', response.data.jwt.token);
				dispatch({
					type: USER_AUTHENTICATED
				});
				history.push('/users');
			})
			.catch(err => {
				dispatch(authError('Incorrect email/password combo'));
			});
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	return {
		type: USER_UNAUTHENTICATED
	};
};

export const getUsers = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				authorization: token
			}
		};
		axios
			.get(`${ROOT_URL}/restricted/users`, config)
			.then(response => {
				dispatch({
					type: GET_USERS,
					payload: response.data
				});
			})
			.catch(err => {
				console.log(err);
				dispatch(authError('Failed to fetch users'));
			});
	};
};
