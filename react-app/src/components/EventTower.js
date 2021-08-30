import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteEventThunk, editEventThunk } from '../store/events';
import EditEventForm from './InputForms/EditEventForm';

const EventTower = ({userEvent}) => {
    const [showEditField, setShowEditField] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteEventThunk(userEvent.id))
    }

    const handleEdit = async () => {
        await dispatch(editEventThunk(userEvent.id))
    }

  return (
      <>


          <h1>{userEvent.event_title}</h1>
          <h2>{userEvent.description}</h2>
          {/* <img src={userEvent.event_img} alt='userEvent' /> */}
          <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
          {showEditField && (
              <div>
                  <EditEventForm event={userEvent}/>
                <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
                <button onClick={handleDelete}>DELETE</button>
              </div>
          )}

      </>
  );
}

export default EventTower;
