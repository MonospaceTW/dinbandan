import React, { Component } from "react";
import { cyan500, blue800, white, red900 } from "material-ui/styles/colors";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import RightIconButton from "./components/RightIconButton";
import IconButton from "material-ui/IconButton";
import CreateNewmenu from "./containers/CreateNewmenu";
import CreateStore from "./containers/CreateStore";
import TextField from "material-ui/TextField";
import FirebaseManager from "./utils/FirebaseManager";
import Modal from "react-modal";
import FontIcon from "material-ui/FontIcon";
import styled from "styled-components";
import _ from "lodash";
import Store from "./containers/Store";
import Sidebar from "./components/utils/Sidebar";
import Login from "./containers/Login";
import { Grid, Row, Col } from "react-flexbox-grid";

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50,
    zIndex: "20"
  }
});

export default class App extends Component {
  state = {
    sidebar: false,
    LOGON: "NONE",
    user: {},
    LoginModal: false,
    account: "",
    password: "",
    accountErrorText: "",
    passwordErrorText: ""
  };

  async componentDidMount() {
    try {
      await FirebaseManager.getRedirectResult();
      if (FirebaseManager.user) {
        this.setState({ user: FirebaseManager.user, LOGON: "LOGON" });
      } else if (window.location.pathname !== "/") {
        window.location = "/";
      }
    } catch (error) {}
  }

  login = async () => {
    try {
      await this.logout();
      const result = await FirebaseManager.signInWithPopup();
      this.setState({ user: result.user, LOGON: "LOGON", LoginModal: false });
    } catch (error) {
      this.setState({ LoginModal: false });
    }
  };

  loginWithEmail = async () => {
    const { account, password } = this.state;
    if (_.isEmpty(account)) {
      this.setState({ accountErrorText: "帳號不可為空" });
    } else if (_.isEmpty(password)) {
      this.setState({ passwordErrorText: "帳號不可為空" });
    } else {
      try {
        const user = await FirebaseManager.signInWithEmailAndPassword(
          account,
          password
        );
        this.setState({ user, LOGON: "LOGON", LoginModal: false });
      } catch (error) {
        const user = await FirebaseManager.createUserWithEmailAndPassword(
          account,
          password
        );
        this.setState({ user, LOGON: "LOGON", LoginModal: false });
      }
    }
  };

  logout = async () => {
    await FirebaseManager.signOut();
    this.setState({ user: {}, LOGON: "NONE" });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Grid fluid>
          <Modal
            ariaHideApp={false}
            isOpen={this.state.LoginModal}
            style={{
              overlay: {
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.75)"
              },
              content: {
                margin: "auto",
                minWidth: 300,
                minHeight: 250,
                width: "40vw",
                height: "30vh"
              }
            }}
            contentLabel="Modal"
          />
          <AppBar
            title="訂便當"
            onLeftIconButtonClick={() => {
              if (FirebaseManager.user) {
                this.setState({ sidebar: true });
              }
            }}
            iconElementLeft={
              <IconButton
                tooltipPosition="bottom-left"
                iconClassName="fa fa-bars"
              />
            }
            iconElementRight={
              <RightIconButton
                logout={this.logout}
                setLoginModal={() => this.setState({ LoginModal: true })}
                LOGON={this.state.LOGON}
                user={this.state.user}
              />
            }
          />
          <Route path="/create/menu/:StoreKey" component={CreateNewmenu} />
          <Route path="/create/store/" component={CreateStore} />
          <Route path="/store" component={Store} />
          <Route path="/" component={Login} />
          <Sidebar
            openSidebar={() => this.setState({ sidebar: false })}
            isOpen={this.state.sidebar}
          />
        </Grid>
      </MuiThemeProvider>
    );
  }
}
