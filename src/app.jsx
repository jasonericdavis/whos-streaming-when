import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext, useAuth } from "./auth-context";
import { Login } from "./login";
import { Authorize } from "./authorize";
import { Home } from "./home";

const app = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const authenticate = (token, cb) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
    cb();
  };

  let auth = useAuth();
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        authenticate,
        clientId: import.meta.env.SNOWPACK_PUBLIC_TWITCH_CLIENT_ID,
      }}
    >
      <Router>
        <Switch>
          <Route path="/authorize">
            <Authorize />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/"
            render={() => {
              return accessToken ? (
                children
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              );
            }}
          >
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default app;
