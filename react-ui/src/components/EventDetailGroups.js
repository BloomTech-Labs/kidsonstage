import React from 'react';
import { /* Field, */ reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { getGroups } from '../actions';
import EventDetailGroupRow from './EventDetailGroupRow';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions, arrow-body-style,
        jsx-a11y/label-has-for
        */

import './css/eventDetail.css';
import { Navbar, NavbarBrand } from 'mdbreact';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/fontawesome-free-solid';

const renderGroups = ({
 load, fields, eventId, props, meta: { error } 
}) => {
  if (eventId) load(eventId);
  return (
    <div className="eventDetail--form_container">
      <Navbar className="eventDetail--box_navbar" dark>
        <NavbarBrand tag="span">Group Info</NavbarBrand>
      </Navbar>
      {eventId > 0 && (
        <ul>
          
          {fields.map((group, index) => (
            <li key={`${group}.row`}>
              <EventDetailGroupRow
                rowProps={props}
                eventId={eventId}
                fields={fields}
                groupText={group}
                index={index}
              />
            </li>
            
          ))}
          <li key={-1}>
            <button
              className="eventDetail--form_container_button"
              id="addGroupButton"
              type="button"
              onClick={() => {
                sessionStorage.setItem('pushingNewGroup', 1);
                fields.push();
              }}
            >
              Add Group
            </button>
          </li>
          {error && (
            <li key={-2} className="error">
              {error}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
const onKeyPress = (event) => {
  // console.log(`kp event ${JSON.stringify(event.which)}`);
  if (event.which === 13 /* Enter */) {
    event.preventDefault();
  }
};
const EventDetailsGroups = (props) => {
  // console.log(`Event Detail Group history? ${props.history}`);
  const { load, history } = props;
  // const {
  //   pristine, /* reset, */ submitting,
  // } = props;
  // const handleFormSubmit = () => {
  //   // const dirties = formValues('groupFA').map((f, i) => {
  //   //   if (f.dirty) console.log(`f.name ${f.name} is dirty`);
  //   //   return { dirty: f.dirty, i };
  //   // });
  //   // console.log(dirties);
  //   // values.groupFA.forEach((group) => {
  //   //   if (!group.id) {
  //   //     add(group);
  //   //     console.log(`${group.name} is new`);
  //   //   } else {
  //   //     const keys = Object.keys(group);
  //   //     let i = 0;
  //   //     const L = keys.length;
  //   //     for (;i < L && !group[keys[i]].dirty; i++);
  //   //     if (i < L) {
  //   //       edit(group);
  //   //       console.log(`${group.name} is dirty`);
  //   //     }
  //   //     console.log(`${group.name} time type ${typeof group.time}`);
  //   //   }
  //   //   // console.log(`detail group ${JSON.stringify(group)} || ${Object.keys(group)} `);
  //   // });
  //   history.push('/events');
  // };

  const eventId = props.eventId || 2;
  // console.log(`Groups load type ${typeof load}`);
  // console.log(`Groups getGroups type ${typeof getGroups}`);
  return (
    <form onKeyPress={onKeyPress}>
      <FieldArray
        name="groupFA"
        component={renderGroups}
        eventId={eventId}
        load={load}
        props={props}
      />
      <div className="eventDetail--return_button_container">
        <button
          type="button"
          // disabled={submitting || !pristine}
          onKeyPress={onKeyPress}
          onClick={() => history.push('/events')}
        >
          Return to Events <FontAwesomeIcon icon={faUndoAlt} />
        </button>
      </div>
    </form>
  );
};
const EventDetail = reduxForm({
  form: 'eventdetailGroups', // a unique identifier for this form
  touchOnBlur: true,
})(EventDetailsGroups);
// export default EventDetail;

const fiveLenthDate = (groups) => {
  return groups.map((group) => {
    const { time, ...rest } = group;
    rest.time = time.substring(0, 5);
    return rest;
  });
};
export default connect(
  state => ({
    initialValues: { groupFA: fiveLenthDate(state.groups) },
  }),
  dispatch => ({
    load: eventId => dispatch(getGroups(eventId)),
  }),
)(EventDetail);

// const selector = formValueSelector('EventDetailsGroups');
// const FA = connect((state) => {
//   const fa = selector(state, 'groupFA');
//   return {
//     fa,
//   };
// })(EventDetail);
// console.log(JSON.stringify(FA));
