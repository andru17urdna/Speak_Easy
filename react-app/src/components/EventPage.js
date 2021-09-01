import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from "../store/events";

const EventPage = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const [event, setEvent] = useState({})


    useEffect(()=> {
        (async () => {
            const singleEvent = await dispatch(getOneEvent(+eventId))
            setEvent(singleEvent)
        })();
    }, [dispatch])


    return (
        <div>
            <h1>event.</h1>
        </div>
    )

}

export default EventPage;
