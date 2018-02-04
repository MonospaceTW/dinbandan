import React, { Component } from "react";
import propTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import { Map } from "immutable";

const LoginForm = styled.form`
  display: flex;
  flex: "flex-grow";
  flex-wrapper: "wrapper";
  flex-flow: "flex-wrap";
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const CenterRow = styled.div`
  margin: auto;
`;

class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: ""
    };
  }
  static propTypes = {
    Login: propTypes.func.isRequired,
    auth: propTypes.instanceOf(Map).isRequired,
    router: propTypes.object.isRequired
  };
  render() {
    const { auth } = this.props;
    console.log(this.props.Login);
    return (
      <LoginForm>
        <fieldset>
          <legend>會員登入</legend>
          <CenterRow>
            <TextField
              onChange={e => this.setState({ account: e.target.value })}
              hintText="帳號"
              errorText={auth.get("accountErrorText")}
            />
          </CenterRow>
          <CenterRow>
            <TextField
              onChange={e => this.setState({ password: e.target.value })}
              hintText="密碼"
              errorText={auth.get("passwordErrorText")}
            />
          </CenterRow>
          <CenterRow>
            <RaisedButton
              onClick={e => this.props.Login(this.state)}
              style={{ width: "100%", marginTop: 10 }}
              disabled={auth.get("isFetching")}
              primary
              label="登入"
            />
          </CenterRow>
          <CenterRow>
            <RaisedButton
              style={{ width: "100%", marginTop: 10 }}
              primary
              disabled={auth.get("isFetching")}
              label="註冊"
            />
          </CenterRow>
        </fieldset>
      </LoginForm>
    );
  }
}

export default LoginScene;
