import React, { useState } from "react";
import { useAuth } from "./auth-context";

export const Home = () => {
  const [users, setUsers] = useState(null);
  const { accessToken, clientId } = useAuth();
  const getUser = () => {
    const url = `https://api.twitch.tv/helix/users`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  return (
    <div>
      {users ? (
        <>
          <h1>Hello {users.data[0].display_name}</h1>
        </>
      ) : (
        <>
          <button onClick={getUser}>Get User</button>
          {users && users.data.map((user) => <p>{user.display_name}</p>)}
          <p>Who dis? </p>
        </>
      )}
    </div>
  );
};

export default Home;
