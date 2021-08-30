import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteEventThunk, getAllEventsThunk, editEventThunk, createEventThunk } from '../store/events';
import { getAllMessagesThunk, createMessageThunk, editMessageThunk, deleteMessageThunk} from '../store/messages'

function Homepage() {
    // const [events, setEvents] = useState();
    const dispatch = useDispatch();



    const events = useSelector((state) => state.events)
    const messages = useSelector((state) => state.messages)

    




// =======================================MESSAGES===================================




const handleEditMessage = async (e) => {
    e.preventDefault();
    const data = {
        text: "Sadly Bradley is no longer with us",
        to_user_id: 2,
        invite: false
    }

    if (data) {
        await dispatch(editMessageThunk(data, 3))
    }

}







    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, [dispatch]);



    return (
        <div>
            {/* {messages && Object.values(messages).map(message => (
                <div key={message.id}>
                    <h1>From User</h1>
                    <p>{message.from_user_id}</p>
                    <h1>To User</h1>
                    <p>{message.to_user_id}</p>
                    <p>{message.text}</p>
                    <button onClick={() => dispatch(deleteMessageThunk(message.id))}>DELETE</button>
                </div>
            ))}
            <button onClick={handleEditMessage}>EDIT</button>

            {events && Object.values(events).map(event => (
                <div key={event.id}>
                    <h1>{event.event_title}</h1>
                    <p>{event.description}</p>
                    <button onClick={() => dispatch(deleteEventThunk(event.id))}>DELETE</button>
                    <button value={event.id} onClick={handleEditMessage}>EDIT</button>
                </div>
            ))}
            <button onClick={handleEventCreation}>CREATE</button> */}
        </div>
    );
  }
  export default Homepage;