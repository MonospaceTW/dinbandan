import React from "react";
import propTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { red900 } from "material-ui/styles/colors";
import { List } from "material-ui/List";
import { Col } from "react-flexbox-grid";

class ListTable extends React.PureComponent {
  static propTypes = {
    deleteStore: propTypes.func.isRequired,
    history: propTypes.object.isRequired
  };

  render() {
    return this.props.storeList.map((store, index) => {
      return (
        <Col key={store.StoreKey} xs={12} md={3}>
          <Paper
            style={{
              width: "90%",
              textAlign: "center",
              display: "inline-block"
            }}
          >
            <List>
              <Avatar src={store.logo.url} size={120} style={{ margin: 10 }} />
              <Divider />
              <RaisedButton
                label="編輯菜單"
                onClick={() =>
                  this.props.history.push(`/create/menu/${store.StoreKey}`)
                }
                style={{ margin: 5 }}
                icon={<FontIcon className="fa fa-gear" />}
              />
              <RaisedButton
                style={{ margin: 5 }}
                label="刪除"
                onClick={() => this.props.deleteStore(store.StoreKey)}
                icon={
                  <FontIcon color={red900} className="fa fa-times-circle" />
                }
              />
            </List>
          </Paper>
        </Col>
      );
    });
  }
}

ListTable.propTypes = {
  deleteStore: propTypes.func.isRequired,
  history: propTypes.object.isRequired
};

export default ListTable;
