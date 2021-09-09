import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFriendThunk } from '../store/session';



const FriendRequest = () => {
    const dispatch = useDispatch();

    const [friendMessage, setFriendMessage] = useState('')

    const handleFriendRequest = async(e) =>{
        console.log('button')
        e.preventDefault()
        const message = await dispatch(addFriendThunk(4))
        setFriendMessage(message)
    }




    return (
        <div>
            <h1>Friend requests</h1>
            <p>{friendMessage}</p>
            <button onClick={(e)=> handleFriendRequest(e)}>Friend</button>
        </div>
    )
}

export default FriendRequest;
