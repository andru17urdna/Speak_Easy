import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteMessageThunk } from '../store/messages';


const Notification = ({message}) => {
    const dispatch = useDispatch();


    const [showEditField, setShowEditField] = useState(false);











  return (
      <>
        <h2>From: {message.from_username}</h2>
        <h3>Message: {message.text}</h3>
        <p>Sent: {message.created_at}</p>
        <button onClick={() => dispatch(deleteMessageThunk(message.id))}>DELETE</button>
        <button onClick={() => setShowEditField((prevState) => !prevState)}>EDIT</button>
        {showEditField && (
            <div>
                <p>LOOK AT ME IMMA REAL fish</p>
                <button onClick={() => setShowEditField((prevState) => !prevState)}>2ND BUTTTON</button>
            </div>
        )}
      </>
  );
}

export default Notification;
