import {connect} from "react-redux";
import CreateNewmenu from "../components/CreateNewmenu";
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewmenu));
