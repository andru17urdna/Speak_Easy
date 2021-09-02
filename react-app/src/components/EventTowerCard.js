import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteEventThunk, editEventThunk } from '../store/events';

import EditEventForm from './InputForms/EditEventForm';


const EventTowerCard = ({event}) => {

    console.log(event)

    const dispatch = useDispatch();

    const [showEditField, setShowEditField] = useState(false);



    const handleDelete = async (e) => {
        await dispatch(deleteEventThunk(e))
    }

    const handleEdit = async (e) => {
        await dispatch(editEventThunk(e))
    }

    return (
        <div>
            <h1>{event.event_title}</h1>
                <h2>{event.description}</h2>
                <p>{event.event_date}</p>
                {/* <img src={event.event_img} alt='event' /> */}
                <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
                {showEditField && (
                    <div>
                        <EditEventForm event={event}/>
                        {/* <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button> */}
                        <button onClick={() => handleDelete(event.id)}>DELETE</button>
                    </div>
                )}
        </div>
    )
}

export default EventTowerCard;
