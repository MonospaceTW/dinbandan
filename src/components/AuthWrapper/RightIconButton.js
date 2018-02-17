import React, { Component } from "react";
import propTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import Menu from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import Popover from "material-ui/Popover";
import { Map } from "immutable";

class RightIconButton extends Component {
  static propTypes = {
    LOGON: propTypes.string.isRequired,
    user: propTypes.instanceOf(Map).isRequired,
    isAuth: propTypes.bool.isRequired,
    Logout: propTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
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
        <div>
          <Avatar onClick={this.handleClick}
            src={this.props.user.get("photoURL")} />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: "left", vertical: "bottom"}}
            targetOrigin={{horizontal: "left", vertical: "top"}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="其他選項" />
              <Divider />
              <MenuItem onClick={this.props.Logout} primaryText="登出" />
            </Menu>
          </Popover>
        </div>
      );
    }
  }
}

export default RightIconButton;
