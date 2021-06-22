import React, { useState } from "react";
import FollowedChannels from "../components/followedChannels";

export const Home = ({user}) => {
  return (
    <div>
      {user ? (
        <>
          <img src={user.profile_image_url} style={{ height: 200 }} />
          <h1>Hello {user.display_name}</h1>
          <FollowedChannels />
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
