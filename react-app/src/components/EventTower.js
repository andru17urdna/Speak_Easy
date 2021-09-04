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
    const userEvents = useSelector(state =>  Object.values(state.userInfo.userEvents).reverse())

    useEffect(() => {
        if (user) {
            dispatch(getEventsByUser(user.id))
        }
    }, [dispatch, user])

if (user) {

  return (
      <div id="event-tower__container">
        <div id='event-tower_header'>
              <h2 id='add-event_head-p'>Your Events</h2>
          <p id='add-event_p' className="material-icons" onClick={() => setShowCreateEvent((prevState) => !prevState)}>add</p>
        </div>

          {showCreateEvent && (
              <>
                <h2 id='add-event_h2'>Adding Event:</h2>
                <CreateEvent showCreateEvent={showCreateEvent} setShowCreateEvent={setShowCreateEvent} />
              </>
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
