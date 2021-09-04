import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from "../store/events";
import { NavLink } from "react-router-dom";
import './css/eventpage.css'

const EventPage = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const [event, setEvent] = useState({})


    const currentUserEvents = useSelector(state => state.userInfo.userEvents)


    useEffect(()=> {
        if (currentUserEvents.hasOwnProperty(eventId)) {
                setEvent(currentUserEvents[eventId])
        } else {
            (async () => {
                const singleEvent = await dispatch(getOneEvent(+eventId))
                setEvent(singleEvent)
            })();
        }
    }, [dispatch, eventId, currentUserEvents])


    return (
        <div id='event-container_div'>
            <div id="event_div">
                <h1 id='event_title'>{event.event_title}</h1>
                <img id='event-page-event_img' src={event.event_img}></img>
                <p id='event_description'>{event.description}</p>
                <p id='event_date'>{event.event_date}</p>
                <NavLink id='event_creator-link' NavLink to={`/user/${event.user_id}`}>Link to Event Creator </NavLink>
            </div>
        </div>
    )

}

export default EventPage;
