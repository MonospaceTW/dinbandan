import { connect } from "react-redux";
import { LoginAction, LOGOUTAction } from "../actions/auth";
import { push } from "react-router-redux";
import AuthWrapper from "../components/AuthWrapper";

const mapStateToProps = ({ router, auth }) => ({
  router,
  auth
});

const mapDispatchToProps = dispatch => {
  return {
    Login: payload => dispatch(LoginAction(payload)),
    goTo: route => dispatch(push(route)),
    Logout: () => dispatch(LOGOUTAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
