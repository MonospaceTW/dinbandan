import React, { Component } from "react";
import propTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import { Map } from "immutable";
import AppBar from "material-ui/AppBar";

const Container = styled.div`
  width: 90vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  width: 300px;
  flex-wrapper: "wrapper";
  justify-content: center;
  align-items: center;
`;

const CenterRow = styled.div`
  margin: auto;
`;

const Fieldset = styled.fieldset`
  width: 40%;
  border-width: 0px;
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
    return (
      <div>
        <AppBar title="訂便當" />
        <Container>
          <LoginForm>
            <Fieldset>
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
                  type="password"
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
            </Fieldset>
          </LoginForm>
        </Container>
      </div>
    );
  }
}

export default LoginScene;
