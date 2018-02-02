import {connect} from "react-redux";
import Store from "../components/Store";
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Store));
