
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUser } from '../store/UserInfo';
import { getEventsByUser } from '../store/UserInfo';
import { createMessageThunk } from '../store/messages';
import CreateNotification from './CreateNotification';
import Notification from './Notification';
import EventTower from './EventTower';

const NavBar = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const messagesToCurrentUser = useSelector(state => state.userInfo.toUserMessages)
    const messagesFromCurrentUser = useSelector(state => state.userInfo.fromUserMessages)
    const currentUserEvents = useSelector(state => state.userInfo.userEvents)
    useEffect(() => {
        if (user) {
            console.log(user)
            dispatch(getMessagesByUser(user.id))
            dispatch(getEventsByUser(user.id))
        }
    }, [dispatch])



  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      {user && (
      <div>
        <h1>====================== Messages To Current User =================== </h1>
        <div><CreateNotification /></div>
        {messagesToCurrentUser && Object.values(messagesToCurrentUser).map(message =>(
          <div key={message.id}>
            <Notification message={message}  />
          </div>
        ))}
        <h1>====================== Messages From Current User =================== </h1>
        {messagesFromCurrentUser && Object.values(messagesFromCurrentUser).reverse().map(message => (
          <div key={message.id}>
            <Notification message={message} />
          </div>
        ))}

        <div>
          <h1>====================== Events From Current User =================== </h1>
          {currentUserEvents && Object.values(currentUserEvents).map(userEvent => (
            <div key={userEvent.id}>
              <EventTower userEvent={userEvent} />
            </div>
          ))}
        </div>

      </div>
        )}
    </nav>
  );
}

export default NavBar;
