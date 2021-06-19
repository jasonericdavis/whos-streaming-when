import React, { useEffect, useState } from "react";
//import { useAuth } from "../auth-context";
import {Route,Redirect} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    const { user } = auth
    return (
      <Route
        path="/"
        render={() => {
          return user ? (
            React.cloneElement(children, { user })
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          );
        }}
      />
    );
};

export default ProtectedRoute