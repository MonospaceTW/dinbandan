import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FirebaseManager from "../../utils/FirebaseManager";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import styled from "styled-components";

const Row = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`;

class CreateNewmenu extends React.Component {
  state = {
    list: [],
    price: 0,
    max: -1,
    min: -1,
    option: "spicy",
    options: {
      spicy: "加辣",
      suger: "加糖",
      ice: "加冰"
    },
    cuisine: {
      logo: "",
      count: 1,
      name: "",
      price: 0,
      options: {}
    },
    showAddModal: false
  };

  async componentWillMount() {
    const {match} = this.props;
    const snapshot = await FirebaseManager.getValue(`/stores/${match.params.StoreKey}/cuisine`);
    if (snapshot) {
      this.setState({
        list: _.values(snapshot)
      });
    }

    FirebaseManager.bindAsyncFunc(`/stores/${match.params.StoreKey}/cuisine`, this.updateCuisime);
  }

  componentWillUnmount() {
    const {match} = this.props;
    FirebaseManager.unbindAsyncFunc(`/stores/${match.params.StoreKey}/cuisine`);
  }

  updateCuisime = cuisines => {
    const cuisineList = _.values(cuisines.val());
    this.setState({list: cuisineList});
  };

  saveCuisine = async() => {
    const {match} = this.props;
    const {cuisine} = this.state;
    await FirebaseManager.addNewData(`/stores/${match.params.StoreKey}/cuisine`, cuisine);
    this.setState({showAddModal: false});
  };

  render() {
    return (
      <div>
        <Table fixedHeader={true} fixedFooter={true}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Logo</TableHeaderColumn>
              <TableHeaderColumn>名稱</TableHeaderColumn>
              <TableHeaderColumn>價格</TableHeaderColumn>
              <TableHeaderColumn>選項</TableHeaderColumn>
              <TableRowColumn>
                <IconButton
                  onClick={() => this.setState({showAddModal: true})}
                  iconClassName="fa fa-plus"/>
              </TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this
              .state
              .list
              .map(cuisine => {
                return (
                  <TableRow key={cuisine.StoreKey}>
                    <TableRowColumn>
                      <Avatar src={cuisine.logo}/>
                    </TableRowColumn>
                    <TableRowColumn>{cuisine.name}</TableRowColumn>
                    <TableRowColumn>{cuisine.price}</TableRowColumn>
                    <TableRowColumn>
                      {_.map(this.state.cuisine.options, (value, key) => {
                        return (
                          <div
                            key={`${cuisine.StoreKey}${key}`}
                            style={{
                            margin: 10
                          }}>
                            <p>{value}</p>
                          </div>
                        );
                      })}
                    </TableRowColumn>
                    <TableRowColumn>備註</TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Dialog
          title="新增料理"
          autoDetectWindowHeight
          actionsContainerStyle={{
          height: "80%"
        }}
          actions={[ < FlatButton key = "cuisinesubmit" label = "送出" onClick = {
            this.saveCuisine
          } />, < FlatButton key = "cuisinecancle" label = "取消" primary = {
            true
          }
          onClick = {
            () => this.setState({showAddModal: false})
          } />
        ]}
          modal={true}
          open={this.state.showAddModal}>
          <label>
            <Row>
              <Avatar size={120} src="https://i.ytimg.com/vi/ZPgswecFK6s/maxresdefault.jpg"/>
              <input
                type="file"
                style={{
                width: 0
              }}
                onChange={e => this.uploadFile(e.target.files[0])}/>
            </Row>
          </label>
          <Row>
            <TextField
              hintText="請輸入料理名稱"
              floatingLabelText="Cuisine Name"
              value={this.state.cuisine.name}
              onChange={e => {
              const {cuisine} = this.state;
              cuisine.name = e.target.value;
              this.setState({cuisine});
            }}/>
          </Row>
          <Row>
            <TextField
              type="tel"
              hintText="請輸入料理價格"
              floatingLabelText="Cuisine Price"
              value={this.state.cuisine.price === 0
              ? ""
              : this.state.cuisine.price}
              onChange={e => {
              const {cuisine} = this.state;
              cuisine.price = e.target.value;
              this.setState({cuisine});
            }}/>
          </Row>
          <Row>
            <TextField
              type="tel"
              hintText="請輸入料理每份數量"
              floatingLabelText="每份數量"
              value={this.state.cuisine.count === 0
              ? ""
              : this.state.cuisine.count}
              onChange={e => {
              const {cuisine} = this.state;
              cuisine.count = e.target.value;
              this.setState({cuisine});
            }}/>
          </Row>
          <Row>
            <DropDownMenu
              value={this.state.option}
              onChange={(e, index, value) => {
              this.setState({option: value});
            }}>
              <MenuItem value="spicy" primaryText="加辣"/>
              <MenuItem value="suger" primaryText="加糖"/>
              <MenuItem value="ice" primaryText="加冰"/>
            </DropDownMenu>
            <IconButton
              iconClassName="fa fa-plus"
              onClick={e => {
              const key = this.state.option;
              const item = this.state.options[key];
              const {cuisine} = this.state;
              cuisine.options[key] = item;
              this.setState({cuisine});
            }}/>
          </Row>
          <Row>
            {_.map(this.state.cuisine.options, (value, key) => {
              return (
                <div key={key} style={{
                  margin: 10
                }}>
                  <p>{value}</p>
                </div>
              );
            })}
          </Row>
          <Row/>
        </Dialog>
      </div>
    );
  }
}

export default CreateNewmenu;
