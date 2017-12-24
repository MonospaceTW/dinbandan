import React from "react";
import FirebaseManager from "../utils/FirebaseManager";
import firebase from "firebase";
import Add from "./Add";
import ListTable from "./ListTable";
import _ from "lodash";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }
  async componentWillMount() {
    var snapshot = await FirebaseManager.getValue("/stores/");
    this.setState({ list: snapshot });
    FirebaseManager.bindAsyncFunc("/stores/", this.updateStores);
  }

  componentWillUnmount() {
    FirebaseManager.unbindAsyncFunc("/stores/");
  }

  updateStores = stores => {
    const storeList = _.values(stores.val());
    this.setState({ list: storeList });
  };

  _Delete(StoreKey) {
    FirebaseManager.removeChild("/stores/", StoreKey);
  }

  _AddNewStore = async storeName => {
    FirebaseManager.addNewStore("stores", { storeName });
  };

  render() {
    const storeList = _.values(this.state.list);
    return (
      <div>
        廠商列表:
        <ListTable storeList={storeList} _Delete={this._Delete} />
        <Add firebase={firebase} _AddNewStore={this._AddNewStore} />
      </div>
    );
  }
}

export default List;
