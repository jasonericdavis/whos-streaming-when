import React from 'react'

export const Schedule = (schedule) => {  
    //this is for a schedule that doesnt have any segments
    if(!schedule || !schedule.segments || schedule.segments.length < 0) {
      return <p>There was an error loading the schedule</p>
    }
  
    return (
      <div>
          <div>
            <p>{schedule.segments[0].title}</p>
            <p>{schedule.segments[0].start_time} - {schedule.segments[0].end_time}</p>
          </div>
      </div>
    )
  }