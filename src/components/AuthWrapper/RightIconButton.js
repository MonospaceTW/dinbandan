import React, { PureComponent } from "react";
import propTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";

class RightIconButton extends PureComponent {
  static propTypes = {
    LOGON: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    isAuth: propTypes.bool.isRequired
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
        >
          <MenuItem onClick={this.props.setLoginModal} primaryText="登入" />
        </IconMenu>
      );
    } else {
      return (
        <IconMenu
          iconButtonElement={
            <Avatar src="https://pbs.twimg.com/media/CjEvuvBWkAI7Yia.jpg" />
          }
        >
          <MenuItem primaryText="其他選項" />
          <Divider />
          <MenuItem onClick={this.props.logout} primaryText="登出" />
        </IconMenu>
      );
    }
  }
}

export default RightIconButton;
