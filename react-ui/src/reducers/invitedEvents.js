import { GET_INVITED_EVENTS, ADD_INVITED_EVENT, DELETE_INVITED_EVENT } from '../actions';

export default (invitedEvents = [], action) => {
  switch (action.type) {
    case GET_INVITED_EVENTS:
      return action.payload;
    case ADD_INVITED_EVENT:
      return [action.payload, ...invitedEvents];
    case DELETE_INVITED_EVENT:
      return invitedEvents.filter(event => event.id !== action.payload.id);
    // case ADD_EVENT_GR
    default:
      return invitedEvents;
  }
};
