import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import styled from "styled-components";

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
  render() {
    console.log(this.props.auth);
    return (
      <LoginForm>
        <fieldset>
          <legend>會員登入</legend>
          <CenterRow>
            <TextField hintText="帳號" errorText={""} />
          </CenterRow>
          <CenterRow>
            <TextField hintText="密碼" errorText={""} />
          </CenterRow>
          <CenterRow>
            <RaisedButton
              style={{ width: "100%", marginTop: 10 }}
              primary
              label="登入"
            />
          </CenterRow>
          <CenterRow>
            <RaisedButton
              style={{ width: "100%", marginTop: 10 }}
              primary
              label="註冊"
            />
          </CenterRow>
        </fieldset>
      </LoginForm>
    );
  }
}

export default LoginScene;
