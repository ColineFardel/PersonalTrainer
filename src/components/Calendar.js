import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState, useEffect } from 'react';

function MyCalendar() {

  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        let trainings = data;
        let list = [];
        trainings.map(training => {
          let title = training.activity + ' ' + training.customer.firstname + ' ' + training.customer.lastname;
          let start = new Date(training.date);
          let end = new Date(training.date);
          end.setMinutes(start.getMinutes() + training.duration);
          let event = {
            title: title,
            start: start,
            end: end,
            allDay: false,
            resource: training,
          }
          list = [...list, event];
        })
        setEvents(list);
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: '95%' }}
      />
    </div>
  )
}

export default MyCalendar;