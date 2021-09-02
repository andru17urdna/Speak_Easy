import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventThunk, editEventThunk } from '../store/events';
import { getEventsByUser } from '../store/UserInfo';
import EditEventForm from './InputForms/EditEventForm';
import CreateEvent from './CreateEvent';
import "./css/eventtower.css";

const EventTower = () => {
    const [showEditField, setShowEditField] = useState(false);
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        await dispatch(deleteEventThunk(e))
    }

    const handleEdit = async (e) => {
        await dispatch(editEventThunk(e))
    }


    const user = useSelector(state => state.session.user)
    const userEvents = useSelector(state =>  Object.values(state.userInfo.userEvents))

    useEffect(() => {
        if (user) {
            dispatch(getEventsByUser(user.id))
        }
    }, [dispatch, user])

if (user) {

  return (
      <div id="event-tower__container">
          <div id='event-tower_header'>
              <p>Event Tower</p>
          <button onClick={() => setShowCreateEvent((prevState) => !prevState)}><span class="material-icons">add</span></button>
        </div>
          {showCreateEvent && (
              <CreateEvent />
          )}

        {userEvents && userEvents.map(userEvent => (

            <div className='event-tower_event-div' key={userEvent.id}>
            <h1>{userEvent.event_title}</h1>
            <h2>{userEvent.description}</h2>
            <p>{userEvent.event_date}</p>
            {/* <img src={userEvent.event_img} alt='userEvent' /> */}
            <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
            {showEditField && (
                <div>
                    <EditEventForm event={userEvent}/>
                    {/* <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button> */}
                    <button onClick={() => handleDelete(userEvent.id)}>DELETE</button>
                </div>
            )}
            </div>
          ))}
      </div>
  )} else {
      return (
          <div></div>
      )
  }
}

export default EventTower;
