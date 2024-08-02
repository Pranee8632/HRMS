import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import { Box, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Events = ({ isAdmin }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => {
        if (response.data.Status) {
          setCurrentEvents(response.data.events);
        } else {
          setError(response.data.Error);
        }
      })
      .catch(error => setError('Failed to fetch events: ' + error))
      .finally(() => setLoading(false));
  }, []);


  const handleDateClick = (selected) => {
    if (!isAdmin) return;

    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: selected.endStr,
      };

      axios.post('http://localhost:3000/api/events', newEvent)
        .then(response => {
          if (response.data.Status) {
            const addedEvent = { ...newEvent, id: response.data.eventId };
            calendarApi.addEvent(addedEvent);
            setCurrentEvents([...currentEvents, addedEvent]);
            alert(response.data.message);
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.log('Failed to add event', error));
    }
  };

  const handleEventClick = (selected) => {
    if (!isAdmin) return;

    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      axios.delete(`http://localhost:3000/api/events/${selected.event.id}`)
        .then(response => {
          if (response.data.Status) {
            selected.event.remove();
            setCurrentEvents(currentEvents.filter(event => event.id !== selected.event.id));
            alert(response.data.message);
            window.location.reload();
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.log('Failed to delete event', error));
    }
  };

  const handleEditEvent = (event) => {
    const title = prompt('Edit event title', event.title);
    if (title) {
      axios.put(`http://localhost:3000/api/events/${event.id}`, { title, start: event.start, end: event.end })
        .then(response => {
          if (response.data.Status) {
            const updatedEvent = { ...event, title };
            setCurrentEvents(currentEvents.map(e => e.id === event.id ? updatedEvent : e));
            alert(response.data.message);
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.log('Failed to update event', error));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  margin: "10px 0",
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
                {isAdmin && (
                  <Box>
                    <IconButton onClick={() => handleEditEvent(event)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleEventClick({ event })}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={isAdmin}
            selectable={isAdmin}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
