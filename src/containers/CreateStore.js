import { connect } from "react-redux";
import {handleCreateStore} from "../actions/store";
import CreateStore from "../components/CreateStore";

const mapStateToProps = ({store}) => ({
  store
});

const mapDispatchToProps = dispatch => {
  return {
    handleCreateStore: payload => dispatch(handleCreateStore(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
