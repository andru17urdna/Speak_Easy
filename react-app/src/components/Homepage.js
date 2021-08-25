import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteEventThunk, getAllEventsThunk } from '../store/events';

function Homepage() {
    // const [events, setEvents] = useState();
    const dispatch = useDispatch();



    const events = useSelector((state) => state.events)


    const handleEventDelete = async (eventId) => {
        await dispatch(deleteEventThunk(1))
    }

    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, []);

    console.log(events)

    return (
        <div>
            {events.length && events.map(event => (
                <div key={event.id}>
                    {console.log(event)}
                    <h1>{event.event_title}</h1>
                    <p>{event.description}</p>
                </div>
            ))}
            <button onClick={handleEventDelete}></button>
        </div>
    );
  }
  export default Homepage;
