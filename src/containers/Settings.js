import { connect } from "react-redux";
import { withRouter } from "react-router";
import Settings from "../components/Settings";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
