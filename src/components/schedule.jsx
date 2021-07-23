import React from 'react'
import dayjs from 'dayjs'

// read start_time and end_time from the event
// and return a string like "10:00-12:00"
function getTimeString(time) {
  //use dayjs to parse the time
  const start = dayjs(time.start_time)
  const end = dayjs(time.end_time)
  //convert to string
  const startStr = start.format('MM/DD/YYYY hh:mm A')
  const endStr =  end.format(start.isSame(end,'day') ? 'hh:mm A' :'MM/DD/YYYY hh:mm A')
  //return a string like "10:00-12:00"
  return `${startStr} to ${endStr}`
}


export const Schedule = (schedule) => {  
    //this is for a schedule that doesnt have any segments
    if(!schedule || !schedule.segments || schedule.segments.length < 0) {
      return <p>There was an error loading the schedule</p>
    }
  
    return (
      <div>
          <div>
            <p>{schedule.segments[0].title}</p>
            <p>{getTimeString(schedule.segments[0])}</p>
          </div>
      </div>
    )
  }