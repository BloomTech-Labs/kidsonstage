import { GET_GROUPS, ADD_GROUP, DELETE_GROUP, EDIT_GROUP } from '../actions';

export default (groups = [], action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    case ADD_GROUP:
      return [action.payload, ...groups];
    case DELETE_GROUP:
      return groups.filter(event => event.id !== action.payload.id);
    case EDIT_GROUP:
      return [action.payload, ...(groups.filter(event => event.id !== action.payload.id))];
    default:
      return groups;
  }
};
