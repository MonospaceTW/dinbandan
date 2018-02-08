import React from "react";
import AppBar from "material-ui/AppBar";
import { Grid, Row } from "react-flexbox-grid";
import RightIconButton from "./RightIconButton";
import IconButton from "material-ui/IconButton";
import LoginScene from "../../containers/Login";
import Sidebar from "../utils/Sidebar";

const AuthWrapper = props => {
  const { auth } = props;
  console.log(auth.toObject());
  return !auth.get("isAuth") ? (
    <LoginScene auth={auth} />
  ) : (
    <Grid fluid>
      <AppBar
        title="訂便當"
        iconElementLeft={
          <IconButton
            tooltipPosition="bottom-left"
            iconClassName="fa fa-bars"
          />
        }
        iconElementRight={
          <RightIconButton
            Logout={props.Logout}
            isAuth={auth.get("isAuth")}
            LOGON={auth.get("LOGON")}
            user={auth.get("user")}
          />
        }
      />
      <Sidebar openSidebar={() => false} isOpen={false} />
    </Grid>
  );
};

export default AuthWrapper;
