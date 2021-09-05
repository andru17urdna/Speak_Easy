import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { deleteEventThunk } from '../store/events';

import EditEventForm from './InputForms/EditEventForm';


const EventTowerCard = ({event}) => {
    const dispatch = useDispatch();

    const [showEditField, setShowEditField] = useState(false);

    const handleDelete = async (e) => {
        await dispatch(deleteEventThunk(e))
    }




    return (
        <div className={!showEditField ?'event-card_container':'eventcard_container-editfield'}>
            <h1 className='event-card_title'><NavLink to={`/event/${event.id}`}>{event.event_title}</NavLink></h1>
                <h2 className='event-card_description' >{event.description}</h2>
                <p className='event-card_date'>Date: {event.event_date.slice(0, -7)}</p>
                <NavLink className='event-card_user-link' to={`/user/${event.user_id}`}>{"User-Link"}</NavLink>
                <img className='event-card-event_img' src={event.event_img} alt='event' />
                <p className={!showEditField? 'event-card_edit-swap': 'event-card_edit-swap-active'} onClick={() => setShowEditField((prevState) => !prevState)}>{!showEditField?
                            <span className="material-icons">edit_note</span>
                            : <span className="material-icons">cancel</span>}
                </p>

                {showEditField && (
                    <p className='delete_event' onClick={() => handleDelete(event.id)}><span className="material-icons">
                    delete_forever
                    </span></p>
                )}

                {showEditField && (
                    <div className='event-card_edit-form-div'>
                        <EditEventForm showEditField={showEditField} setShowEditField={setShowEditField} event={event}/>
                    </div>
                )}
        </div>
    )
}

export default EventTowerCard;
