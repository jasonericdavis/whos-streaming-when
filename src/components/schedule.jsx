import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const Schedule = ({to_id}) => {
    const [schedule, setSchedule] = useState();
    const {fetchData } = useAuth();
    useEffect(() => {
      //if (!accessToken || !user) return;
  
      return fetchData(`/schedule?broadcaster_id=${to_id}`)
        .then((response) => response.json())
        .then((response) => {
          console.dir(response.data)
          setSchedule(response.data)
        });
    }, []);
  
    if(!schedule){
      return <p>Loading ...</p>
    }
  
    return (
      <div>
        <h2>Schedule for {schedule.broadcaster_name}</h2>
        {/* {schedule.segments.map((segment, index) => {
            return(
              <div key={index}>
                <p>{segment.title}</p>
                <p>{segment.start_time} - {segment.end_time}</p>
              </div>
            )
          })
        } */}
          <div>
            <p>{schedule.segments[0].title}</p>
            <p>{schedule.segments[0].start_time} - {schedule.segments[0].end_time}</p>
          </div>
        
      </div>
    )
  }