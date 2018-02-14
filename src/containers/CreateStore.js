import { connect } from "react-redux";
import {handleCreateStore} from "../actions/store";
import { withRouter } from "react-router";
import CreateStore from "../components/CreateStore";

const mapStateToProps = ({store, router}) => ({
  store,
  router
});

const mapDispatchToProps = dispatch => {
  return {
    handleCreateStore: payload => dispatch(handleCreateStore(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateStore));
