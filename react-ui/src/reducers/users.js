import { GET_USERS, GET_USER } from '../actions';

export default (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case GET_USER:
      return [action.payload];
    default:
      return users;
  }
};
