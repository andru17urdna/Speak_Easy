import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from "../store/events";
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
                <h1>{event.event_title}</h1>
                <img id='event-page-event_img' src={event.event_img}></img>
                <p>{event.description}</p>
                <p>{event.event_date}</p>
            </div>
        </div>
    )

}

export default EventPage;
