import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateNotification from '../CreateNotification';
import Notification from '../Notification';
import { getMessagesByUser } from '../../store/UserInfo';

const UserMessages = () =>{
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const messagesToCurrentUser = useSelector(state => state.userInfo.toUserMessages)
    const messagesFromCurrentUser = useSelector(state => state.userInfo.fromUserMessages)


    useEffect(() => {
        if (user) {
            dispatch(getMessagesByUser(user.id))
        }
    }, [dispatch, user])

    if (user) {



        return (
            <>
              <h1 id='h1_messages'>Notifications</h1>
                <h2 id='h2_noti-to-you'>Notifications to you: </h2>
            <div id='noti_to_user'>
                {messagesToCurrentUser && Object.values(messagesToCurrentUser).map(message =>(
                  <div className='message-container' key={message.id}>
                    <Notification message={message}  />
                  </div>
                ))}
            </div>
          </>
    )} else {
        return (
            <div>
            </div>
        )
    }
}

export default UserMessages;
