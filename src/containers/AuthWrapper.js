import { connect } from "react-redux";
import { LoginAction, LogoutAction } from "../actions/auth";
import { push } from "react-router-redux";
import AuthWrapper from "../components/AuthWrapper";
import { withRouter } from "react-router";

const mapStateToProps = ({ router, auth }) => ({
  router,
  auth
});

const mapDispatchToProps = dispatch => {
  return {
    Login: payload => dispatch(LoginAction(payload)),
    goTo: route => dispatch(push(route)),
    Logout: () => dispatch(LogoutAction())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWrapper));
