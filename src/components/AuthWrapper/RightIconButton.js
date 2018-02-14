import React, { Component } from "react";
import propTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import { Map } from "immutable";

class RightIconButton extends Component {
  static propTypes = {
    LOGON: propTypes.string.isRequired,
    user: propTypes.instanceOf(Map).isRequired,
    isAuth: propTypes.bool.isRequired,
    Logout: propTypes.func.isRequired
  };
  render() {
    if (this.props.isAuth === false) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton
              iconClassName="fa fa-user"
              iconStyle={{ color: "white" }}
            />
          }
        />
      );
    } else {
      return (
        <IconMenu
          iconButtonElement={<Avatar src={this.props.user.get("photoURL")} />}
        >
          <MenuItem primaryText="其他選項" />
          <Divider />
          <MenuItem onClick={this.props.Logout} primaryText="登出" />
        </IconMenu>
      );
    }
  }
}

export default RightIconButton;
