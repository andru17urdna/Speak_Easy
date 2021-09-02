import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { deleteEventThunk, editEventThunk } from '../store/events';

import EditEventForm from './InputForms/EditEventForm';


const EventTowerCard = ({event}) => {
    const dispatch = useDispatch();

    const [showEditField, setShowEditField] = useState(false);

    const handleDelete = async (e) => {
        await dispatch(deleteEventThunk(e))
    }


    return (
        <div>
            <NavLink to={`/event/${event.id}`}><h1>{event.event_title}</h1></NavLink>
                <h2>{event.description}</h2>
                <p>{event.event_date}</p>
                <NavLink to={`/user/${event.user_id}`}>{"User-Link"}</NavLink>
                {/* <img src={event.event_img} alt='event' /> */}
                <button onClick={() => setShowEditField((prevState) => !prevState)}>{!showEditField? "Edit" : "Close Edit Form"}</button>
                {showEditField && (
                    <div>
                        <EditEventForm event={event}/>
                        <button onClick={() => handleDelete(event.id)}>DELETE</button>
                    </div>
                )}
        </div>
    )
}

export default EventTowerCard;
