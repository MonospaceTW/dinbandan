import {connect} from "react-redux";
import Store from "../components/Store";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({store}) => ({
  store
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Store));
