import React from "react";
import propTypes from "prop-types";
import { TableBody, TableRow, TableRowColumn } from "material-ui/Table";
import { red900 } from "material-ui/styles/colors";
import FlatButton from "material-ui/FlatButton";
import Avatar from "material-ui/Avatar";
const ListTable = props => {
  return props.storeList.map((store, index) => {
    return (
      <TableRow key={store.StoreKey}>
        <TableRowColumn>
          <Avatar src={store.logo.url} />
        </TableRowColumn>
        <TableRowColumn>{store.name}</TableRowColumn>
        <TableRowColumn>
          <FlatButton label="揪團" onClick={() => alert("開啟揪團")} />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            backgroundColor={red900}
            labelStyle={{ color: "white" }}
            label="刪除"
            onClick={() => props.deleteStore(store.StoreKey)}
          />
        </TableRowColumn>
      </TableRow>
    );
  });
};

ListTable.propTypes = {
  deleteStore: propTypes.func.isRequired
};

export default ListTable;
