import React, { Component } from "react";
import { cyan500 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AuthWrapper from "./containers/AuthWrapper";

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 60,
    zIndex: "20"
  }
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AuthWrapper />
      </MuiThemeProvider>
    );
  }
}
