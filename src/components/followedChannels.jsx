import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Schedule } from "./schedule";

const FollowedChannel = ({to_name, to_id}) => {
  const [showSchedule, setShowSchedule] = useState(false)

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log(`${to_name} was clicked`)
    setShowSchedule(!showSchedule)
  }
  return (
    <div>
      <a href="" onClick={onClickHandler}>{to_name}</a>
      {true ? <Schedule to_id={to_id} /> : null}
    </div>
  )
}

const FollowedChannels = () => {
    const [follows, setFollows] = useState();
    const { fetchData, user } = useAuth();
    useEffect(() => {
      //if (!accessToken || !user) return;
  
      return fetchData(`/users/follows?first=100&from_id=${user.id}`)
        .then((response) => response.json())
        .then((response) => {
          console.dir(response.data)
          setFollows(response.data)
        });
    }, []);
  
    if (!follows) return <div>Loading Who you Follow</div>;
    return (
      <div>
        <h1>Follows</h1>
        <ul>
          {follows.map((item, index) => (
              <li key={index}>
                <FollowedChannel {...item} />
              </li>
          ))}
        </ul>
      </div>
    );
};
  
  export default FollowedChannels;