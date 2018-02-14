import { connect } from "react-redux";
import { LoginAction } from "../actions/auth";
import LoginScene from "../components/Login";
import { withRouter } from "react-router";

const mapStateToProps = ({ router, auth }) => ({
  router,
  auth
});

const mapDispatchToProps = dispatch => {
  return {
    Login: payload => dispatch(LoginAction(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScene));
