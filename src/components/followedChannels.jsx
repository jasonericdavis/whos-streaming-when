import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Schedule } from "./schedule";
import dayjs from "dayjs";

function filterBroadcasters(broadcasters, filter) {
  return (
    (broadcasters || []).filter(
      broadcaster => {
        if(filter.toLowerCase() === 'today'){
          return dayjs().isSame(broadcaster.schedule.segments[0].start_time, 'day');
        }

        if(filter.toLowerCase() === 'tomorrow'){
          return dayjs().add(1, 'day').isSame(broadcaster.schedule.segments[0].start_time, 'day');
        }

        return false
    })
    .sort( (a,b) => {
      return dayjs(a.schedule.segments[0].start_time).isAfter(b.schedule.segments[0].start_time) ?  1: -1;
    })
  );
}

function removeBroadcastersWithScheduleErrors(broadcasters) {
  return broadcasters.filter(broadcaster => {
    return broadcaster.schedule; 
  })
}

const FollowedChannel = ({to_name}) => {
  return (
    <div>
      <h2>{to_name}</h2>
    </div>
  )
}

const FollowedChannels = () => {
    const [broadcasterSchedule,setBroadcasterSchedule] = useState();
    const [filter, setFilter] = useState('today');
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
            .then((returnSchedule) => {
              return {broadcaster, schedule: (returnSchedule.error)? null : returnSchedule.data}
            })
          }))
          .then(data => {
            const broadcasters = removeBroadcastersWithScheduleErrors(data)
            setBroadcasterSchedule(broadcasters)
          })
        });
    }, []);

    const setFilterToday = (e) => {
      e.preventDefault();
      setFilter('today');
    }

    const setFilterTomorrow = (e) => {
      e.preventDefault();
      setFilter('tomorrow');
    }
  
    if (!broadcasterSchedule) return <div>Loading Schedule</div>;
    return (
      <div>
        <h1>Follows</h1>
        <div>
          <button onClick={setFilterToday}>Today</button>
          <button onClick={setFilterTomorrow}>Tomorrow</button>
        </div>
        <ul>
          {filterBroadcasters(broadcasterSchedule, filter).map((item, index) => (
              <li key={index}>
                <FollowedChannel {...item.broadcaster} />
                <Schedule {...item.schedule} />
              </li>
          ))}
        </ul>
      </div>
    );
};
  
  export default FollowedChannels;