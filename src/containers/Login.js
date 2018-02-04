import { connect } from "react-redux";
import LoginScene from "../components/Login";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ router }) => ({
  router
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
