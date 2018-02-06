import React, { Component } from "react";
import { cyan500, blue800, white, red900 } from "material-ui/styles/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import CreateNewmenu from "./containers/CreateNewmenu";
import AuthWrapper from "./containers/AuthWrapper";
import CreateStore from "./containers/CreateStore";
import styled from "styled-components";
import Store from "./containers/Store";
import Login from "./containers/Login";

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
        <Switch>
          <AuthWrapper>
            <Route path="/create/menu/:StoreKey" component={CreateNewmenu} />
            <Route path="/create/store/" component={CreateStore} />
            <Route path="/store" component={Store} />
            <Route exact path="/" component={Login} />
          </AuthWrapper>
        </Switch>
      </MuiThemeProvider>
    );
  }
}
