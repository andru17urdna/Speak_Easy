import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendThunk } from '../store/session';



const FriendRequest = () => {
    const dispatch = useDispatch();

    const [friendMessage, setFriendMessage] = useState('')
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user)
    

    const handleFriendRequest = async(e) =>{
        e.preventDefault()
        const message = await dispatch(addFriendThunk(4, user.user_name))
        message.error ? setErrors(message.error) : setFriendMessage(message)

    }




    return (
        <div>
            <h1>Friend requests</h1>
            {errors.map((error, ind) => (
					<div className='edit_notification-errors' key={ind}>{error}</div>
				))}
            <p>{friendMessage}</p>
            <button onClick={(e)=> handleFriendRequest(e)}>Friend</button>
        </div>
    )
}

export default FriendRequest;
