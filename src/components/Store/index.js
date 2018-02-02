import { Grid, Row } from "react-flexbox-grid";
import React from "react";
import propTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FontIcon from "material-ui/FontIcon";
import FlatButton from "material-ui/FlatButton";
import Avatar from "material-ui/Avatar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import FirebaseManager from "../../utils/FirebaseManager";
import ListTable from "./ListTable";
import _ from "lodash";


class StoreList extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      storeData: {
        logo: {
          url:
            "https://firebasestorage.googleapis.com/v0/b/dinbandan-46e8c.appspot.com/o/2141E8" +
            "BBBADAw1080h1080.jpeg?alt=media&token=2a6d4040-4efa-406e-918d-b8664ae4b841",
          route: "/540690_174963562682907_1282419118_n.jpg"
        },
        name: "hello",
        cate: 1
      }
    };
  }
  async componentWillMount() {
    var snapshot = await FirebaseManager.getValue("/stores/");

    this.setState({ list: snapshot });
    FirebaseManager.bindAsyncFunc("/stores/", this.updateStores);
  }

  componentWillUnmount() {
    FirebaseManager.unbindAsyncFunc("/stores/");
  }

  uploadFile = async file => {
    const logo = await FirebaseManager.uploadFile(file);
    const data = this.state.storeData;
    data.logo = logo;
    this.setState({ storeData: data });
  };

  saveStore = async () => {
    const { storeData } = this.state;
    await FirebaseManager.addNewData("/stores", storeData);
  };

  deleteStore = async StoreKey => {
    await FirebaseManager.removeChild("/stores", StoreKey);
  };

  updateStores = stores => {
    const storeList = _.values(stores.val());
    this.setState({ list: storeList });
  };

  render() {
    const { history } = this.props;
    const storeList = _.values(this.state.list);
    return (
      <div>
        <Grid>
          <Row>
            <FlatButton
              style={{ marginBottom: 10 }}
              label="新增商店"
              labelPosition="before"
              icon={<FontIcon className="fa fa-plus" />}
              onClick={() => history.push("/create/store")}
            />
          </Row>
          <Row>
            <ListTable
              storeList={storeList}
              deleteStore={this.deleteStore}
              history={history}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default StoreList;
