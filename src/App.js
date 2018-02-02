import React, { Component } from "react";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar title="My AppBar" />
          <Drawer open={true} docked={false}>
            <AppBar
              iconElementLeft={<div />}
              iconClassNameRight="fa fa-arrow-left"
              onRightIconButtonClick={() => console.log("right")}
            />
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
