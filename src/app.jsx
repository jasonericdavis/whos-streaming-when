import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { Login } from "./pages/login";
import { Authorize } from "./pages/authorize";
import { Home } from "./pages/home";
import ProtectedRoute from "./components/protectedRoute";

const app = () => {
  return (
    <ProvideAuth>
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
    </ProvideAuth>
  );
};

export default app