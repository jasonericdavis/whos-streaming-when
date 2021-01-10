import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  accessToken: null,
  clientId: null,
  user: null,
  authenticate: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
