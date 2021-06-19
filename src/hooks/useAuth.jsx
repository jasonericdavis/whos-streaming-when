import React, { useState, useEffect, useContext, createContext } from "react";

const clientId = import.meta.env.VITE_PUBLIC_TWITCH_CLIENT_ID;
const twitchBaseURL = 'https://api.twitch.tv/helix'

// export const AuthContext = createContext({
//   user: null,
//   authenticate: () => {},
//   fetchData: () => {}
// });

const authContext = createContext();

function useProvideAuth() {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const authenticate = (token) => {
      return getUser(token, clientId).then((users) => {
        console.dir(users);
        setUser(users.data[0]);
        setAccessToken(token);
      })
    };

    const getUser = (accessToken, clientId) => {
        const url = `${twitchBaseURL}/users`;
        return fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": clientId,
          },
        }).then((response) => response.json());
    };

    const fetchData = (path) => {
      const url = `${twitchBaseURL}${path}`
      return fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": clientId,
        },
      })
    }

    // useEffect(() => {
    //   if (!accessToken) return;
  
    //   getUser(accessToken, clientId).then((users) => {
    //     console.dir(users);
    //     setUser(users.data[0]);
    //   });
    // }, [accessToken]);

    return {
      user,
      authenticate,
      fetchData
    }
}

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}