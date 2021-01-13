import React, { useState, useEffect } from "react";
import { useAuth } from "./auth-context";

export const Streams = () => {
  const [streams, setStreams] = useState();
  const { accessToken, clientId, user } = useAuth();
  useEffect(() => {
    if (!accessToken || !user) return;

    const url = `https://api.twitch.tv/helix/videos?user_id=547843230`;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    })
      .then((response) => response.json())
      .then((response) => setStreams(response.data));
  }, []);

  if (!streams) return <div>Loading Streams</div>;
  return (
    <div>
      {streams.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
};

export default Streams;
