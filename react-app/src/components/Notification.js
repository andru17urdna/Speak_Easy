import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageThunk } from '../store/messages';
import EditNotification  from './InputForms/EditMessageForm'

const Notification = ({message}) => {
    const dispatch = useDispatch();


    const [showEditField, setShowEditField] = useState(false);
    const user = useSelector(state => state.session.user)


    useEffect(() => {
      if (user) {
        if (message.from_user_id === user.id) {

        }
      }
  }, [dispatch, user, message.from_user_id])


  return (
      <>
        <h2 className='from_username'> {message.from_user_id === user.id? `To: ${message.to_username}`: `From: ${message.from_username}`}</h2>
        <p className='message_text'>{message.text}</p>
        <p className='message_sent'>Sent: {message.created_at}</p>

        {(message.from_user_id === user.id) &&
        <p className='show_edit' onClick={() => setShowEditField((prevState) => !prevState)}>
              {!showEditField ? <span className="material-icons">edit_note</span>
                              :<span className="material-icons">close</span>
              }
        </p>
      }
      <p className='message-delete_button' onClick={() => dispatch(deleteMessageThunk(message.id, message.from_user_id))}><span className="material-icons">delete_forever</span></p>
        {showEditField && (
            <EditNotification message={message} showEditField={showEditField} setShowEditField={setShowEditField} />
        )}
      </>
  );
}

export default Notification;
