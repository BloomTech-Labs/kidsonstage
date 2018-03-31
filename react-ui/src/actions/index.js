import axios from 'axios';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

/* eslint-disable no-console, semi-style */

axios.defaults.withCredentials = true;

const ROOT_URL =
  (process.env.NODE_ENV === 'production') ?
  'https://kidsonstage.herokuapp.com:443/api/'
  : 'http://localhost:5000/api/'
  ;

export const authError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error,
});

export const register = (user, history) => (dispatch) => {
  if (user.password !== user.confirmPassword) {
    dispatch(authError('Passwords do not match'));
    return;
  }
  console.log(`in "register" for username ${user.username} email ${user.email}`);
  axios
    .post(`${ROOT_URL}/users`, user)
    .then(() => {
      dispatch({
        type: USER_REGISTERED,
      });
      console.log(`pushing /signin for user ${user.username}`);
      history.push('/signin');
    })
    .catch((err) => {
      console.log(`"register" ${err}`);
      dispatch(authError('Failed to register user'));
    });
};

export const login = (user, history) => (dispatch) => {
  axios
    .post(`${ROOT_URL}/login`, user)
    .then((response) => {
      localStorage.setItem('token', response.data.jwt.token);
      dispatch({
        type: USER_AUTHENTICATED,
      });
      // history.push('/users');
      console.log(`${typeof history}`);
    })
    .catch((err) => {
      console.log(`login ${err}`);
      dispatch(authError('Incorrect email/password combo'));
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: USER_UNAUTHENTICATED,
  };
};

export const getUsers = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/restricted/users`, config)
    .then((response) => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to fetch users'));
    });
};
