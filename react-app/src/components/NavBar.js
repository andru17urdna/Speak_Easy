
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUser } from '../store/UserInfo';
import { createMessageThunk } from '../store/messages';

import Notification from './Notification';

const NavBar = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const messagesToCurrentUser = useSelector(state => state.userInfo.toUserMessages)
    const messagesFromCurrentUser = useSelector(state => state.userInfo.fromUserMessages)
    console.log(messagesToCurrentUser)
    console.log(messagesFromCurrentUser,'dfljsdljsdfiosd')

    const handleMessageCreation = async (e) => {
      e.preventDefault();
      const data = {
              text: "Sadly Bradley is no longer with us",
              to_user_id: 2,
              invite: false
      }

          if (data) {
          await dispatch(createMessageThunk(data))
      }
  }


    useEffect(() => {
        if (user) {
            dispatch(getMessagesByUser(user.id))
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
      <div>
      <div><button onClick={handleMessageCreation}>CREATE MESSAGE</button></div>
      {messagesToCurrentUser && Object.values(messagesToCurrentUser).map(message =>(
        <div key={message.id}>
          <Notification message={message} />
        </div>

      ))}
      </div>
    </nav>
  );
}

export default NavBar;
