import React from "react";

const url = `https://id.twitch.tv/oauth2/authorize?client_id=${
  import.meta.env.SNOWPACK_PUBLIC_TWITCH_CLIENT_ID
}&redirect_uri=${
  import.meta.env.SNOWPACK_PUBLIC_REDIRECT_URL
}&response_type=token`;

export const Login = () => {
  return (
    <div>
      You should Login
      <a href={url}>
        <button>Login</button>
      </a>
    </div>
  );
};
