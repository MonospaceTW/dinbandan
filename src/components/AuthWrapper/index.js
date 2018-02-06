import React, { PureComponent } from "react";
import propTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import { Grid, Row } from "react-flexbox-grid";
import FirebaseManager from "../../utils/FirebaseManager";
import RightIconButton from "./RightIconButton";
import IconButton from "material-ui/IconButton";
import Sidebar from "../utils/Sidebar";

class AuthWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth, match } = this.props;
    const isAuth = auth.get("isAuth");
    const nextAuth = nextProps.auth.get("isAuth");

    if (nextAuth !== isAuth && isAuth === false) {
      this.props.goTo("/");
    }
  }
  componentDidMount() {
    const { auth, match } = this.props;
    const isAuth = auth.get("isAuth");
    if (isAuth === false) {
      this.props.goTo("/");
    }
  }
  render() {
    const { auth } = this.props;

    return (
      <Grid fluid>
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
              isAuth={auth.get("isAuth")}
              LOGON={auth.get("LOGON")}
              user={auth.get("user")}
            />
          }
        />
        <Row>{this.props.children}</Row>
        <Sidebar
          openSidebar={() => this.setState({ sidebar: false })}
          isOpen={this.state.sidebar}
        />
      </Grid>
    );
  }
}

export default AuthWrapper;
