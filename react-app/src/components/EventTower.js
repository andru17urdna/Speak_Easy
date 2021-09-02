import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByUser } from '../store/UserInfo';
import EventTowerCard from './EventTowerCard'

import CreateEvent from './CreateEvent';
import "./css/eventtower.css";

const EventTower = () => {

    const dispatch = useDispatch();

    const [showCreateEvent, setShowCreateEvent] = useState(false);





    const user = useSelector(state => state.session.user)
    const userEvents = useSelector(state =>  Object.values(state.userInfo.userEvents))

    useEffect(() => {
        if (user) {
            dispatch(getEventsByUser(user.id))
        }
    }, [dispatch, user])

if (user) {

  return (
      <div id="event-tower__container">
          <div id='event-tower_header'>
              <p>Event Tower</p>
          <button onClick={() => setShowCreateEvent((prevState) => !prevState)}><span class="material-icons">add</span></button>
        </div>
          {showCreateEvent && (
              <CreateEvent />
          )}

        {userEvents && userEvents.map(event => (
            <div className='event-tower_event-div' key={event.id}>
                <EventTowerCard event={event} />

            </div>
          ))}
      </div>
  )} else {
      return (
          <div></div>
      )
  }
}

export default EventTower;
