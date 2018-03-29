import { connect } from 'react-redux';
import NewUser from './NewUser';
import { register } from '../actions';

const mapStateToProps = state => ({
  username: state.username,
  passwordHash: state.passwordHash,
  email: state.email,
  phone: state.phone,
  byEmail: state.byEmail,
  byPhone: state.byPhone,
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
