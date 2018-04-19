import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import UsersReducer from './users';
import EventReducer from './events';
import GroupReducer from './groups';
import ActiveEvent from './activeEvent';
import PartGroupReducer from './participantGroups'

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  events: EventReducer,
  event: ActiveEvent,
  groups: GroupReducer,
  partGroups: PartGroupReducer,
});

export default rootReducer;
