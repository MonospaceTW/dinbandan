import React from "react";
import propTypes from "prop-types";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import AppBar from "material-ui/AppBar";
import {Link} from "react-router-dom";

class Sidebar extends React.PureComponent{
  static propTypes = {
    isOpen: propTypes.bool.isRequired,
    openSidebar: propTypes.func.isRequired,
  };

  render(){
    return(
      <Drawer width={200} open={this.props.isOpen} zDepth={1}>
      <AppBar
        onLeftIconButtonClick={() => console.log("left icon")}
        iconElementLeft={< div />}
        iconElementRight={< IconButton onClick = {this.props.openSidebar}
      iconClassName = "fa fa-arrow-left" iconStyle = {{ color: "white" }}/>}/>
      <Link to="/store">
        <MenuItem
          primaryText="商店列表"
          leftIcon={< FontIcon className = "fa fa-building" />}/>
      </Link>
      <Link to="/settings">
        <MenuItem
          primaryText="網站設定"
          leftIcon={< FontIcon className = "fa fa-gear" />}/>
      </Link>
      <Divider/>
    </Drawer>
    );
  }
}

export default Sidebar;
