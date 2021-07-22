import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Schedule } from "./schedule";

const FollowedChannel = ({to_name}) => {
  return (
    <div>
      <h2>{to_name}</h2>
    </div>
  )
}

const FollowedChannels = () => {
    const [broadcasterSchedule,setBroadcasterSchedule] = useState();
    const { fetchData, user } = useAuth();
    useEffect(() => {
      //if (!accessToken || !user) return;
  
      return fetchData(`/users/follows?first=100&from_id=${user.id}`)
        .then((response) => response.json())
        .then((response) => {
          Promise.all(response.data.map(broadcaster => {
            return fetchData(`/schedule?broadcaster_id=${broadcaster.to_id}`)
            .then((response) => {
              return response.json() || {data: {}}
            })
            .then((schedule) => {
              return {broadcaster, schedule}
            })
          }))
          .then(data => {
            const filteredData = data.filter(sch => {
              return !sch.schedule.error
            })
            setBroadcasterSchedule(filteredData)
          })
        });
    }, []);
  
    if (!broadcasterSchedule) return <div>Loading Schedule</div>;
    return (
      <div>
        <h1>Follows</h1>
        <ul>
          {broadcasterSchedule.map((item, index) => (
              <li key={index}>
                <FollowedChannel {...item.broadcaster} />
                <Schedule {...item.schedule.data} />
              </li>
          ))}
        </ul>
      </div>
    );
};
  
  export default FollowedChannels;