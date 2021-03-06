import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, login, logout, clearErrors } from '../../actions/session';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.errors.session,
  formType: (ownProps.match.path === "/signup") ? "Sign Up" : "Login"
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = (ownProps.match.path === "/signup") ? signup : login;
  return {
    login: (user) => dispatch(login(user)),
    action: (user) => dispatch(action(user)),
    logout: (user) => dispatch(logout(user)),
    clearErrors: (errors) => dispatch(clearErrors(errors))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps)(SessionForm)
);
