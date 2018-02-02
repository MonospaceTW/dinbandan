
import {connect} from "react-redux";
import Settings from "../components/Settings";
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
