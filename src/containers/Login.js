import { connect } from "react-redux";
import { LoginAction } from "../actions/auth";
import LoginScene from "../components/Login";

const mapStateToProps = ({ router, auth }) => ({
  router,
  auth
});

const mapDispatchToProps = dispatch => {
  return {
    Login: payload => dispatch(LoginAction(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
