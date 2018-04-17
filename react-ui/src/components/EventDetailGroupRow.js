import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import formatTime from './normalizers/normalizeTime';
import './css/eventDetail.css';
import completedBI from './graphics/completed.png';
import pencilBI from './graphics/pencil.png';
import trashBI from './graphics/trash.png';
import { addGroup, editGroup, deleteGroup } from '../actions';

/* eslint-disable react/forbid-prop-types, no-console, no-nested-ternary */

class EventDetailGroupRow extends Component {
  constructor(props) {
    super(props);
    const thisGroup = this.props.groups[this.props.index];
    this.state = {
      readOnly: (thisGroup !== undefined),
      group: (thisGroup !== undefined) ? thisGroup : {
        id: -1, name: '', time: '00:00', completed: false,
      },
      completed: thisGroup ? thisGroup.completed : false,
      eventId: this.props.eventId,
    };
    // console.log(`index: ${this.props.index} group length: ${this.props.groups.length} `);
    // console.log(`groupId ${this.state.group.id}`);
  }
  add(group) {
    console.log(`eventId: ${this.state.eventId} group name: ${group.name}`);
    this.props.add(this.state.eventId, group);
  }
  sendGroup(group, edit) {
    if (group.name && group.time && group.time !== '00:00') {
      console.log(`group.name: ${group.name} group.time: ${group.time} group.eventId: ${group.eventId}`);
      return (group.id > 0 ? edit(group) : this.add(group));
    }
    return null;
  }
  render() {
    const {
      fields, groupText, index, remove, edit,
    } = this.props;
    return (
      <div>
        <Field
          name={`${groupText}.name`}
          type="text"
          component="input"
          label={`${index + 1}) `}
          placeholder="name"
          readOnly={this.state.readOnly}
          style={{ textDecoration: this.state.completed ? 'line-through' : 'none' }}
          onBlur={(event) => {
            const group = Object.assign(this.state.group);
            group.name = event.target.value;
            this.setState(
            {
              group,
            },
            this.sendGroup(group, edit),
          );
          }}
        />
        <Field
          name={`${groupText}.time`}
          type="text"
          placeholder="HH:MM"
          normalize={formatTime}
          component="input"
          readOnly={this.state.readOnly}
          style={{ textDecoration: this.state.completed ? 'line-through' : 'none' }}
          onBlur={(event) => {
            const group = Object.assign(this.state.group);
            console.log(`time: ${event.target.value}`);
            group.time = `${event.target.value}:00`; // event.target.value;
            this.setState(
            {
              group,
            },
            this.sendGroup(group, edit),
          );
          }}
        />
        {/* <div className="mycheckbox">
          <Field name={`${group}.completed`} id="competedGroup" title="Complete Group"
          label="completed" component="input" type="checkbox" className="checkbox" />
          <label htmlFor="completedGroup" />
        </div> */}
        <button
          type="button"
          title="Complete Group"
          style={{ opacity: this.state.completed ? 0 : 1, enabled: !this.state.completed }}
          onClick={() => {
            if (this.state.group.name && this.state.group.time) {
              const group = Object.assign(this.state.group);
              console.log(`group name ${group.name} complete click`);
              group.completed = true;
              this.setState(
              {
                group,
                completed: true,
              },
              this.sendGroup(group, edit),
              );
            }
          }}
        >
          <img src={completedBI} id="completedBI" alt="completed" className="BI" />
        </button>
        <button
          type="button"
          title="Edit Group"
          onClick={() => {
            this.setState({
              readOnly: !this.state.readOnly,
            });
          }}
        >
          <img src={pencilBI} id="pencilBI" alt="edit" className="BI" />
        </button>
        <button
          type="button"
          title="Remove Group"
          onClick={() => {
            if (this.state.group.id > 0) remove(this.state.group);
            fields.remove(index);
          }}
        >
          <img src={trashBI} id="pencilBI" alt="edit" className="BI" />
        </button>
      </div>
    );
  }
}
EventDetailGroupRow.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.object.isRequired,
  groupText: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
};
export default connect(state => ({
  groups: state.groups,
}), dispatch => ({
  edit: group => dispatch(editGroup(group)),
  remove: group => dispatch(deleteGroup(group.eventId, group.id)),
  add: (eventId, group) => dispatch(addGroup(eventId, group)),
}
))(EventDetailGroupRow);
