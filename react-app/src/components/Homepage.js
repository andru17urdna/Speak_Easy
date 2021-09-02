import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsThunk } from '../store/events';
import './css/homepage.css';

function Homepage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, [dispatch]);

    const user = useSelector(state => state.session.user)
    const events = useSelector((state) => Object.values(state.events))


    return (
        <div id='user-home-container_div'>
            <h1 id='user-home_username'>Welcome {user.user_name} </h1>
            <div id='user-home-event-cont_div'>
                {events && events.map(event => (
                    <div className='event-container' key={event.id}>
                        <h1 className='event-name'>{event.event_title}</h1>
                        <img className='user-home_event-img' src={"https://suitabletech.com/images/HelpCenter/errors/Lenovo-Camera-Error.JPG"} alt='event'></img>
                        <p>{event.description}</p>
                        <p>{event.event_date}</p>
                    </div>
                ))}
            </div>
            <h1 id='user-home_next'>Next Most Recent Event:</h1>
            {events.length && (
            <div id='user-home_next-event'>
                <h1>{events[0].event_title}</h1>
                <img src={events[0].event_img} alt='event'></img>
                <p>{events[0].description}</p>
                <p>{events[0].event_date}</p>
            </div>
            )}
        </div>
    );
  }
  export default Homepage;
