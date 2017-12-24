import React, { Component } from "react";
import { cyan500, blue800, white, red900 } from "material-ui/styles/colors";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import RightIconButton from "./components/RightIconButton";
import CreateNewmenu from "./components/CreateNewmenu";
import TextField from "material-ui/TextField";
import FirebaseManager from "./utils/FirebaseManager";
import firebase from "firebase";
import Modal from "react-modal";
import FontIcon from "material-ui/FontIcon";
import styled from "styled-components";
import _ from "lodash";
import Store from "./Store";
import uuid from "uuid/v4";
const LoginContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  constructor(props) {
    super(props);
    this.state = {
      LOGON: "NONE",
      user: {},
      LoginModal: false,
      account: "",
      password: "",
      accountErrorText: "",
      passwordErrorText: ""
    };
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
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
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
                  marginLeft: "30vw",
                  marginTop: "30vh",
                  width: "30vw",
                  height: "30vh"
                }
              }}
              contentLabel="Modal"
            >
              <LoginContent>
                <div>
                  <TextField
                    hintText="Account"
                    type="email"
                    errorText={this.state.accountErrorText}
                    value={this.state.account}
                    onChange={e => this.setState({ account: e.target.value })}
                  />
                  <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    errorText={this.state.passwordErrorText}
                    type="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <RaisedButton
                    label="登入"
                    onClick={this.loginWithEmail}
                    backgroundColor={blue800}
                    labelColor={white}
                  />
                </div>
                <div>
                  <RaisedButton
                    label="FacebookLogin"
                    onClick={this.login}
                    style={{ margin: 10 }}
                    primary={true}
                    icon={<FontIcon className="fa fa-facebook" color={white} />}
                  />
                </div>
                <div>
                  <RaisedButton
                    label="取消"
                    onClick={() => this.setState({ LoginModal: false })}
                    backgroundColor={red900}
                    labelColor={white}
                  />
                </div>
              </LoginContent>
            </Modal>
            <AppBar
              title="訂便當"
              onLeftIconButtonClick={() => console.log("left icon")}
              iconElementLeft={<IconButton iconClassName="fa fa-bars" />}
              iconElementRight={
                <RightIconButton
                  logout={this.logout}
                  setLoginModal={() => this.setState({ LoginModal: true })}
                  LOGON={this.state.LOGON}
                  user={this.state.user}
                />
              }
            />
            <Route path="/create/menu" component={CreateNewmenu} />
            <Route path="/store" component={Store} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
