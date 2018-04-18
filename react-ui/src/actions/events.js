import axios from 'axios';
import { ROOT_URL, authError } from './index';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const ADD_GROUPS = 'ADD_GROUPS';
export const GET_GROUPS = 'ADD_GROUPS';
export const DELETE_GROUP = 'DELETE_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const SET_EVENT_ID = 'SET_EVENT_ID';
export const GET_EVENT_ID = 'GET_EVENT_ID';

/* eslint-disable no-console, semi-style */

axios.defaults.withCredentials = true;

export const getEvents = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/byUser/${id}`, config)
    .then((response) => {
      // console.log(`getEvents data: ${response.data}`);
      dispatch({
        type: GET_EVENTS,
        payload: response.data || [],
      });
    })
    .catch(() => {
      // console.log(err);
      dispatch(authError('Failed to fetch events'));
    });
};


export const getGroups = eventId => (dispatch) => {
  if (!eventId) return;
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id };
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/${eventId}/groups`, body, config)
    .then((response) => {
      dispatch({
        type: GET_GROUPS,
        payload: response.data || [],
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to fetch groups'));
    });
};
export const addEvent = event => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id'); sessionStorage.getItem('id');
  console.log(`addEvent ${JSON.stringify(event)}`);
  if (!id || !token) {
    console.log('addEvent not logged in');
    dispatch(authError('Not logged in'));
    return;
  }
  if (id !== event.owner) {
    console.log(`addEvent Illegal id: ${id} event.owner: ${event.owner}`);
    dispatch(authError('Illegal'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/events`, event, config)
    .then((response) => {
      console.log(`addEvent id ${JSON.stringify(response.data[0])}`);
      // to do verify JSON.parse(response.config.data == event)
      dispatch({
        type: ADD_EVENT,
        payload: { id: response.data[0], ...event },
      });
    })
    .catch((err) => {
      console.log(`addEvent ${err}`);
      dispatch(authError('Failed to fetch users'));
    });
};
export const addGroup = (eventId, group) => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id, eventId, ...group };
  console.log(`addGroup group.name ${group.name} group.time: ${group.time}`);
  console.log(`addGroup body.name ${body.name} body.time: ${body.time}  eventId: ${eventId}`);
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .post(`${ROOT_URL}/events/${eventId}/groups`, body, config)
    .then((response) => {
      console.log(`addGroup id ${response.data}`);
      // to do verify JSON.parse(response.config.data == group)
      sessionStorage.setItem(`group.id:${group.name}`, response.data);
      dispatch({
        type: ADD_GROUP,
        payload: {
          id: response.data,
          eventId,
          name: group.name,
          time: group.time,
          completed: group.completed,
        },
      });
    })
    .catch((err) => {
      console.log(`addGroup ${err}`);
      dispatch(authError('Failed to add group'));
    });
};

export const deleteEvent = event => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .delete(`${ROOT_URL}/events`, event, config)
    .then((response) => {
      console.log(`delete event response ${JSON.stringify(response.data)}`);
      dispatch({
        type: DELETE_EVENT,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to delete event'));
    });
};

export const deleteGroup = (eventId, groupId) => (dispatch) => {
  console.log(`delete groupId ${groupId} eventId: ${eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .delete(`${ROOT_URL}/events/${eventId}/groups/${groupId}`, config)
    .then((response) => {
      console.log(`delete group response ${Number(response.data)}`);
      dispatch({
        type: DELETE_GROUP,
        payload: Number(response.data),
      });
    })
    .catch((err) => {
      console.log(`delete error: ${JSON.stringify(err, null, 2)}`);
      dispatch(authError('Failed to delete group'));
    });
};
export const editGroup = group => (dispatch) => {
  // console.log(`editGroup group id: ${group.id} name ${group.name} eventId: ${group.eventId}`);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const body = { userId: id, ...group };
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .put(`${ROOT_URL}/events/${group.eventId}/groups/${group.id}`, body, config)
    .then((response) => {
      console.log(`edit group response ${JSON.stringify(response.config.data)}`);
      dispatch({
        type: EDIT_GROUP,
        payload: JSON.parse(response.config.data),
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Failed to edit group'));
    });
};
// /:eventId/groups/:groupId
export const getEvent = eventId => (dispatch) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  if (!id || !token) {
    dispatch(authError('Not logged in'));
    return;
  }
  const config = {
    headers: {
      authorization: token,
    },
  };
  axios
    .get(`${ROOT_URL}/events/${eventId}`, config)
    .then((response) => {
      // console.log(`getEvent title: ${response.data[0].title}`);
      // console.log(`getEvent eventDate: ${response.data[0].eventDate}`);
      dispatch({
        type: GET_EVENT,
        payload: response.data[0] || {},
      });
    })
    .catch((err) => {
      console.log(`getEvent ${err}`);
      dispatch(authError('Failed to fetch event'));
    });
};
export const setEventId = eventId => (dispatch) => {
  if (!eventId) dispatch(authError('bad event id'));
  sessionStorage.setItem('eventId', eventId);
  console.log(`dispatching eventID ${eventId}`);
  dispatch({
    type: SET_EVENT_ID,
    payload: eventId,
  });
};
export const getEventId = () => (dispatch) => {
  const eventId = sessionStorage.getItem('eventId');
  dispatch({
    type: SET_EVENT_ID,
    payload: eventId,
  });
};
