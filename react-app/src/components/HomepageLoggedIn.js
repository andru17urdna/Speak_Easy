import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsThunk } from "../store/events";
import { NavLink } from "react-router-dom";
import './css/homepage.css';

const HomepageLoggedIn = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, [dispatch]);

    const user = useSelector(state => state.session.user)
    const events = useSelector((state) => Object.values(state.events))


    return (
        <div id='user-home-container_div'>
            <h1 id='user-home_username'>Welcome {user.user_name} </h1>
            <h2 id='user-home_h2'>Recently Created Events:</h2>
            <div id='user-home-event-cont_div'>
                {events && events.map(event => (
                    <div className='event-container' key={event.id}>
                        <NavLink className='event-container_h1' to={`/event/${event.id}`}><h1>{event.event_title}</h1></NavLink>
                        <img className='user-home_event-img' src={event.event_img} alt='event'></img>
                        <p>{event.description}</p>
                        <p>{event.event_date}</p>
                        <NavLink to={`/user/${event.user_id}`}>{"User-Link"}</NavLink>
                    </div>
                ))}
            </div>
            <h1 id='user-home_next'>Next Most Recent Event:</h1>
            {events.length && (
            <div id='user-home_next-event'>
                <h1 id='user-home_next-h1'>{events[0].event_title}</h1>
                <img src={events[0].event_img} id='user-home_next-img' alt='event'></img>
                <p id='user-home_next-description'>{events[0].description}</p>
                <p id='user-home_next-date'>Event date: {events[0].event_date}</p>
                <NavLink id='user-navlink' to={`/user/${events[0].user_id}`}>{"User-Link"}</NavLink>
            </div>
            )}
        </div>
    )
}


export default HomepageLoggedIn
