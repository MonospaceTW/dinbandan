import React from "react";
import propTypes from "prop-types";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import Avatar from "material-ui/Avatar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import FirebaseManager from "../../utils/FirebaseManager";
import ListTable from "./ListTable";
import _ from "lodash";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class StoreList extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showAddModal: false,
      storeData: {
        logo: {
          url:
            "https://firebasestorage.googleapis.com/v0/b/dinbandan-46e8c.appspot.com/o/2141E8BBBADAw1080h1080.jpeg?alt=media&token=2a6d4040-4efa-406e-918d-b8664ae4b841",
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
    await FirebaseManager.addNewStore("/stores", storeData);
  };

  deleteStore = async StoreKey => {
    await FirebaseManager.removeChild("/stores", StoreKey);
  };

  updateStores = stores => {
    const storeList = _.values(stores.val());
    this.setState({ list: storeList });
  };

  render() {
    const storeList = _.values(this.state.list);
    console.log(this.props);
    return (
      <div>
        <Table fixedHeader={true} fixedFooter={true}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="10" style={{ textAlign: "center" }}>
                商店列表
              </TableHeaderColumn>
              <TableRowColumn colSpan="1">
                <IconButton
                  onClick={() => this.setState({ showAddModal: true })}
                  iconClassName="fa fa-plus"
                />
              </TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <ListTable storeList={storeList} />
          </TableBody>
        </Table>
        <Dialog
          title="新增商店"
          actions={[
            <FlatButton
              key="storesubmit"
              label="送出"
              onClick={this.saveStore}
            />,
            <FlatButton
              key="storecancle"
              label="取消"
              primary={true}
              onClick={() => this.setState({ showAddModal: false })}
            />
          ]}
          modal={true}
          open={this.state.showAddModal}
        >
          <label>
            <Row>
              <Avatar size={80} src={this.state.storeData.logo.url} />
              <input
                type="file"
                style={{ width: 0 }}
                onChange={e => this.uploadFile(e.target.files[0])}
              />
            </Row>
          </label>
          <Row>
            <TextField
              hintText="請輸入商店名稱"
              floatingLabelText="Store Name"
              value={this.state.storeData.name}
              onChange={e => {
                const { storeData } = this.state;
                storeData.name = e.target.value;
                this.setState({
                  storeData
                });
              }}
            />
          </Row>
          <Row>
            <DropDownMenu
              value={this.state.storeData.cate}
              onChange={(e, index, value) => {
                const data = this.state.storeData;
                data.cate = value;
                this.setState({ storeData: data });
              }}
            >
              <MenuItem value={1} primaryText="早餐" />
              <MenuItem value={2} primaryText="午餐" />
              <MenuItem value={3} primaryText="飲料" />
              <MenuItem value={4} primaryText="點心" />
              <MenuItem value={5} primaryText="飲料" />
            </DropDownMenu>
          </Row>
          <Row />
        </Dialog>
      </div>
    );
  }
}

export default StoreList;
