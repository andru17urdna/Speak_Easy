import React from 'react';
import { useDispatch } from 'react-redux';
import { addFriendThunk } from '../store/messages';



const FriendRequest = () => {
    const dispatch = useDispatch();

    const handleFriendRequest = async(e) =>{
        console.log('button')
        e.preventDefault()
        await dispatch(addFriendThunk(5))
    }




    return (
        <div>
            <h1>Friend requests</h1>
            <button onClick={(e)=> handleFriendRequest(e)}>Friend</button>
        </div>
    )
}

export default FriendRequest;
