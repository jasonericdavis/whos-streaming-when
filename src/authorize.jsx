import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "./auth-context";

export const Authorize = () => {
  const loc = useLocation();
  const history = useHistory();
  const auth = useAuth();
  const accessToken = loc.hash.split("&")[0].split("=")[1];

  useEffect(() => {
    auth.authenticate(accessToken, () => history.push("/"));
  }, []);

  return <div>I am the Authorize with {accessToken || "N/A"}</div>;
};

export default Authorize;
