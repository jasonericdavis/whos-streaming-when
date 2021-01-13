import React, { useEffect, useState } from "react";
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

const getUser = (accessToken, clientId) => {
  const url = `https://api.twitch.tv/helix/users`;
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId,
    },
  }).then((response) => response.json());
};

const ProtectedRoute = ({ children }) => {
  const { accessToken, user } = useAuth();
  return (
    <Route
      path="/"
      render={() => {
        return accessToken ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

const app = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [clientId, setClientId] = useState(
    import.meta.env.SNOWPACK_PUBLIC_TWITCH_CLIENT_ID
  );

  const [user, setUser] = useState();

  const authenticate = (token, cb) => {
    setAccessToken(token);
    cb();
  };

  useEffect(() => {
    if (!accessToken) return;

    getUser(accessToken, clientId).then((users) => {
      console.log(`data: ${JSON.stringify(users)}`);
      setUser(users.data[0]);
    });
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        authenticate,
        user,
        clientId,
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
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default app;
