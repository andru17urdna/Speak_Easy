import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsThunk } from "../store/events";

const UserHome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, [dispatch]);

    const events = useSelector((state) => Object.values(state.events))

    
    return (
        <div>
            {events && events.map(event => (
                <div>
                    <h1>{event.event_title}</h1>
                    <h2>{event.description}</h2>
                    <h3>{event.event_date}</h3>
                </div>
            ))}
        </div>
    )
}


export default UserHome
