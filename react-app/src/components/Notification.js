import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteMessageThunk } from '../store/messages';
import EditNotification  from './InputForms/EditMessageForm'

const Notification = ({message}) => {
    const dispatch = useDispatch();


    const [showEditField, setShowEditField] = useState(false);
    const user = useSelector(state => state.session.user)

    console.log(message)


    useEffect(() => {
      if (user) {
        console.log(message.from_user_id)
        if (message.from_user_id === user.id) {
        }


      }
  }, [dispatch])







  return (
      <>
        <h2>From: {message.from_username}</h2>
        <h2>Message ID: {message.id}</h2>
        <h3>Message: {message.text}</h3>
        <p>Sent: {message.created_at}</p>

        {(message.from_user_id === user.id) &&
        <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
          }
        {showEditField && (
          <div>
                <EditNotification message={message} />
                <button onClick={() => dispatch(deleteMessageThunk(message.id, message.from_user_id))}>DELETE</button>
            </div>
        )}
      </>
  );
}

export default Notification;
