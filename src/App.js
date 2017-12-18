import React, { Component } from "react";
import { cyan500, blue800, white, red500 } from "material-ui/styles/colors";
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

const FacebookLogin = styled.button`
  background-color: ${blue800};
  height: 40px;
  padding: 5px;
  font-size: 22px;
  color: ${white};
  border-radius: 5px;
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LOGON: "NONE",
      user: null
    };
  }

  login = async () => {
    const result = await auth().signInWithPopup(provider);
    this.setState({ user: result.user });
  };

  logout = async () => {
    await auth().signOut();
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Modal
            isOpen={true}
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
                style={{ backgroundColor: blue800, margin: 10 }}
                primary={true}
                icon={<FontIcon className="fa fa-facebook" color={white} />}
              />
            </LoginContent>
          </Modal>
          <AppBar
            title="訂便當"
            onLeftIconButtonClick={() => console.log("left icon")}
            iconElementLeft={<IconButton iconClassName="fa fa-bars" />}
            iconElementRight={<RightIconButton />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
