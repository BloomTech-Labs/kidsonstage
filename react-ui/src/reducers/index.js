import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import UsersReducer from './users';
import EventReducer from './events';
import GroupReducer from './groups';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  events: EventReducer,
  groups: GroupReducer,
});

export default rootReducer;
