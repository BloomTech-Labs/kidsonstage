import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import UsersReducer from './users';
import EventReducer from './events';
import GroupReducer from './groups';
import ActiveEvent from './activeEvent';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  events: EventReducer,
  event: ActiveEvent,
  groups: GroupReducer,
});

export default rootReducer;
