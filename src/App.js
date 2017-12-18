import React, { Component } from "react";
import { cyan500, blue800, white, red900 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import RightIconButton from "./components/RightIconButton";
import firebase from "firebase";
import Modal from "react-modal";
import FontIcon from "material-ui/FontIcon";
import styled from "styled-components";

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

const config = {
  apiKey: "AIzaSyCJshSB2O3ZG84vRqT9hOMJPDtQXQqOY7U",
  authDomain: "dinbandan-46e8c.firebaseapp.com",
  databaseURL: "https://dinbandan-46e8c.firebaseio.com",
  storageBucket: "dinbandan-46e8c.appspot.com",
  messagingSenderId: "544525397793",
  projectId: "dinbandan-46e8c"
};

firebase.initializeApp(config);

const auth = firebase.auth;
const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("");
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LOGON: "NONE",
      user: {},
      LoginModal: false
    };
  }

  login = async () => {
    try {
      await this.logout();
      const result = await auth().signInWithPopup(provider);
      this.setState({ user: result.user, LOGON: "LOGON", LoginModal: false });
    } catch (error) {
      this.setState({ LoginModal: false });
    }
  };

  logout = async () => {
    await auth().signOut();
    this.setState({ user: {}, LOGON: "NONE" });
  };

  render() {
    return (
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
              <RaisedButton
                label="FacebookLogin"
                onClick={this.login}
                style={{ margin: 10 }}
                primary={true}
                icon={<FontIcon className="fa fa-facebook" color={white} />}
              />
              <RaisedButton
                label="取消"
                onClick={() => this.setState({ LoginModal: false })}
                backgroundColor={red900}
                labelColor={white}
              />
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
        </div>
      </MuiThemeProvider>
    );
  }
}
