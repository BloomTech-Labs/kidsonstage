import React from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand } from 'mdbreact';
// import PropTypes from 'prop-types';
import { getEvent } from '../actions';
import RenderGroups from './EventDetailGroups';
import './css/eventDetail.css';
import normalizeDate from './normalizers/normalizeDate';

// import TextField from 'material-ui/TextField';

import Billing from './stripe';

import { TextField } from 'material-ui';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black',
    }}
    underlineFocusStyle={{
      borderColor: 'white',
    }}
    underlineStyle={{
      borderColor: 'grey',
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red',
    }}
  />
);
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions */
/*

     tbl.increments('id').primary(); // primary key
        tbl.integer('eventId').references('id').inTable('events');
        tbl.string('name',100).notNullable();
        tbl.dateTime('time').notNullable();
        tbl.boolean('completed').notNullable().defaultTo(false);
*/

/*
    return knex.schema.createTable('events', function(tbl) {
      tbl.increments('id').primary(); // primary key
      tbl
        .integer('owner')
        .references('id')
        .inTable('users');
      tbl.string('title', 100).notNullable();
      tbl.dateTime('eventDate').notNullable();
      tbl.boolean('activated').notNullable().defaultTo(false);
      tbl.boolean('completed').notNullable().defaultTo(false);
    });
*/
const nomalizeEventDate = (event) => {
  if (event && event.eventDate) {
    const newDate = normalizeDate(event.eventDate);
    // console.log(`eventDate: ${event.eventDate} newDate: ${newDate}`);
    if (newDate) {
      event.formattedDate = newDate;
      // console.log(`set formattedDate: ${event.formattedDate}`);
    }
  }
  return event;
};
class EventsForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: '',
  //     formattedDate: null,
  //   };
  // }
  // componentDidMount() {
  // //   console.log(`componentDidMount ran partGroups: ${this.props.partGroupsS}`);
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     2000,
  //   );
  // }
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }
  tick = () => {
    console.log(`in tick title: ${this.props.event.title}`);
    const newEvent = nomalizeEventDate(this.props.event);
    this.props.changeFieldValues('eventdetail', {
      // event: {
      title: newEvent.title,
      formattedDate: newEvent.formattedDate,
      keepDirty: false,
      // },
      // initialValues: { event: nomalizeEventDate(this.props.event) },
    });
    this.props.changeFieldValues('eventdetailGroups', {
      groupFA: this.props.loadRowData(this.props.groups, this.props.partGroups),
    });

    // const iresult = initialize('eventdetail', {
    //   title: newEvent.title,
    //   formattedDate: newEvent.formattedDate,
    //   keepDirty: false,
    // });
    // console.log(`iresult: ${JSON.stringify(iresult, null, 2)}`);
  };
  render() {
    // console.log(`showEventId ${JSON.stringify(process.env, null, 2)}`);
    const { load } = this.props;
    // const eventId = sessionStorage.getItem('eventId');
    // const eventId = (id <= 0) ? sessionStorage.getItem('eventId') : id;
    const eventId = Number(sessionStorage.getItem('eventId'));
    const admin = Number(sessionStorage.getItem('admin'));
    // console.log(`Event Detail history? ${props.history}`);
    // console.log(`Event Detail eventId: ${eventId}`);
    // console.log(`loadEvent type ${typeof loadEvent}`);
    // console.log(`getEvent type ${typeof getEvent}`);
    if (eventId > 0) load(eventId);
    // console.log(`event ${JSON.stringify(event)}`);
    return (
      <div className="eventDetail--container">
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark>
            <NavbarBrand tag="span">Event Info</NavbarBrand>
          </Navbar>
          {process.env.REACT_APP_ShowEventId === 'true' &&
          <Field
            name="event.id"
            type="number"
            component={renderTextField}
            placeholder="id"
            readOnly="true"
          />
          }
          <div className="eventDetail--box_content">
              Event Name:{'  '}
            <Field
              name="event.title"
              type="text"
              component={renderTextField}
              placeholder="title"
              readOnly="true"

            />
            <br />
              Event Date:{'  '}
            <Field
              name="event.formattedDate"
              type="text"
              component={renderTextField}
              placeholder="Event Date"
              readOnly="true"
            />
          </div>
        </div>
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark>
            <NavbarBrand tag="span">Group Info</NavbarBrand>
          </Navbar>
          <RenderGroups eventId={eventId} admin={admin} history={this.props.history} />
        </div>
        {admin > 0 && (
          <div className="eventDetail--form_container">
            <Navbar className="eventDetail--box_navbar" dark>
              <NavbarBrand tag="span">Event Status</NavbarBrand>
            </Navbar>
            <br />
            <div className="eventDetail--box_content">
              {/* Display stripe payment box if event isn't activated */}

              {this.props.initialValues.event.activated === true ? (
                <div className="eventDetail--activated">ACTIVATED</div>
              ) : (
                <Billing eventId={eventId} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}


// EventsForm.propTypes = {
//   // loadEvent: PropTypes.func.isRequired,
// };

const EventDetail = reduxForm({
  form: 'eventdetail', // a unique identifier for this form
  touchOnBlur: true,
  enableReinitialize: true,
  keepDirty: true,
})(EventsForm);
// export default EventDetail;
const fiveLenthDate = (groups, partGroups) => groups.map((group) => {
  const userId = Number(sessionStorage.getItem('id'));
  const partIndex = partGroups.findIndex(partGroup =>
    (partGroup.groupId === group.id) &&
        (partGroup.userId === userId));

  const partGroup = (partIndex >= 0 ? partGroups[partIndex] : undefined);

  // this.setState({
  //   group: { ...group, partGroup },
  // });
  const checked = (partIndex >= 0);
  const { time, ...rest } = group;
  // if (checked) {
  //   console.log(`partIndex: ${partIndex} partGroups.length: ${state.partGroups.length}
  //     partGroup.groupId ${partGroup ? partGroup.groupId : null} group.id ${group.id}
  //     group.name |${group.name}| checked ${checked} `);
  // }
  //  else {
  //   console.log(`group ${group.id} |${group.name}| is unchecked`);
  // }
  // rest.time = time.substring(0, 5);
  return {
    ...rest, time: time.substring(0, 5), checked, partGroup,
  };
});
export default connect(
  state => ({
    event: nomalizeEventDate(state.event),
    initialValues: { event: nomalizeEventDate(state.event) },
    loadRowData: (groups, partGroups) => fiveLenthDate(groups, partGroups),
    groups: state.groups,
    partGroups: state.partGroups,
  }),
  dispatch => ({
    load: eventId => dispatch(getEvent(eventId, 1)),
    changeFieldValues: (formName, data) =>
      dispatch(initialize(formName, data)),
  }),
)(EventDetail);
// export default connect(state => ({
//   initialValues: { event: state.event },
// }), { load: eventId => getEvent(eventId) })(EventDetail);
