import React, { useState } from "react";
import { useAuth } from "./auth-context";
import { Follows } from "./follows";
import { Streams } from "./streams";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <img src={user.profile_image_url} style={{ height: 200 }} />
          <h1>Hello {user.display_name}</h1>
          <Streams />
          <Follows />
        </>
      ) : (
        <>
          <p>Waiting to load user</p>
        </>
      )}
    </div>
  );
};

export default Home;
