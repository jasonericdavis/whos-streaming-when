import React, { useState, useEffect } from "react";
import { useAuth } from "./auth-context";

export const Follows = () => {
  const [follows, setFollows] = useState();
  const { accessToken, clientId, user } = useAuth();
  useEffect(() => {
    if (!accessToken || !user) return;

    const url = `https://api.twitch.tv/helix/users/follows?from_id=${user.id}`;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    })
      .then((response) => response.json())
      .then((response) => setFollows(response.data));
  }, []);

  if (!follows) return <div>Loading Follows</div>;
  return (
    <div>
      {follows.map((item, index) => (
        <div key={index}>{item.to_name}</div>
      ))}
    </div>
  );
};

export default Follows;
