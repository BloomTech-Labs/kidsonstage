import React from 'react';
import { /* Field, */ reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/fontawesome-free-solid';
import { getGroups, getPartGroups } from '../actions';
import EventDetailGroupRow from './EventDetailGroupRow';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions, arrow-body-style,
        jsx-a11y/label-has-for
        */

import './css/eventDetail.css';

const renderGroups = ({
  groupFA,
  partGroups,
  load,
  loadPart,
  fields,
  eventId,
  initialize,
  admin,
  props,
  meta: { error },
}) => {
  if (eventId) {
    loadPart(eventId);
    load(eventId);
  }
  return (
    <div>
      {eventId > 0 && (
        <ul>
          {fields.map((group, index) => (
            <li key={`${group}.row`}>
              <EventDetailGroupRow
                rowProps={props}
                eventId={eventId}
                admin={admin}
                fields={fields}
                groupText={group}
                index={index}
                // groupP={groupFA[index]}
                // partGroups={partGroups}
                group={groupFA[index]}
              />
            </li>
          ))}
          {admin > 0 && (
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
          )}
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
        admin={props.admin}
        load={load}
        props={props}
        groupFA={props.initialValues.groupFA}
        partGroups={props.initialValues.partGroups}
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

const fiveLenthDate = (state) => {
  return state.groups.map((group) => {
    const userId = Number(sessionStorage.getItem('id'));
    const partIndex = state.partGroups.findIndex(partGroup => partGroup.groupId,);

    const partGroup = partIndex >= 0 ? state.partGroups[partIndex] : undefined;
    group.partGroup = partGroup;
    // this.setState({
    //   group: { ...group, partGroup },
    // });
    const checked = partIndex >= 0;
    const { time, ...rest } = group;
    // console.log(`partIndex: ${partIndex} partGroups.length: ${state.partGroups.length}
    //     group.partGroup ${rest.partGroup} group.checked ${rest.checked} `);
    rest.time = time.substring(0, 5);
    return { 
      ...rest, time: time.substring(0, 5), checked, partGroup, 
    };
  });
};
export default connect(
  state => ({
    initialValues: {
      groupFA: fiveLenthDate(state),
      // partGroups: state.partGroups,
    },
  }),
  dispatch => ({
    load: eventId => dispatch(getGroups(eventId)),
    loadPart: eventId => dispatch(getPartGroups(eventId)),
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
