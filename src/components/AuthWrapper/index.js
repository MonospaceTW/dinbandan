import React from "react";
import propTypes from "prop-types";
import AppBar from "material-ui/AppBar";

import RightIconButton from "./RightIconButton";
import IconButton from "material-ui/IconButton";
import LoginScene from "../../containers/Login";
import Sidebar from "../utils/Sidebar";
import Store from "../Store";
import CreateStore from "../../containers/CreateStore";
import {Map} from "immutable";
import { Grid } from "react-flexbox-grid";
import { Route, Switch } from "react-router-dom";

const AuthWrapper = props => {
  const { auth } = props;
  return !auth.get("isAuth") ? (
    <LoginScene auth={auth} />
  ) : (
    <Grid fluid>
      <AppBar
        title="訂便當"
        iconElementLeft={
          <IconButton
            onKeyboardFocus={() => false}
            tooltipPosition="bottom-left"
            iconClassName="fa fa-bars"
          />
        }
        iconElementRight={
          <RightIconButton
            onKeyboardFocus={() => false}
            Logout={props.Logout}
            isAuth={auth.get("isAuth")}
            LOGON={auth.get("LOGON")}
            user={auth.get("user")}
          />
        }
      />
      <Switch>
        <Route exact path="/" component={Store} />
        <Route path="/create/store" component={CreateStore} />
      </Switch>
      <Sidebar openSidebar={() => false} isOpen={false} />
    </Grid>
  );
};

AuthWrapper.propTypes = {
  auth: propTypes.instanceOf(Map).isRequired,
  goTo: propTypes.func.isRequired,
  Login: propTypes.func.isRequired,
  Logout: propTypes.func.isRequired
};

export default AuthWrapper;
