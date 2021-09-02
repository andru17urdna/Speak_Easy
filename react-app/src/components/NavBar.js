
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUser } from '../store/UserInfo';
import CreateNotification from './CreateNotification';
import Notification from './Notification';
import EventTower from './EventTower';

import "./css/navbar.css";

const NavBar = () => {

    const dispatch = useDispatch();

    const [showMessages, setShowMessages] = useState(false);

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
    <nav id='nav-container'>
      <NavLink to='/'>Home</NavLink>
      <div class="dropdown">
        {user &&
      <span>{user.user_name}</span>
      }
      <div className='dropdown-content'>
      <ul>
        <li>
          <NavLink to='/user-home' exact={true} activeClassName='active'>
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
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
        <li>
          <button onClick={() => setShowMessages((prevState) => !prevState)}>SHOW MESSAGES</button>
        </li>
      </ul>
      {showMessages && (
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

      </div>
        )}
      </div>
    </div>
    </nav>
  );
  } else {

    return (
      <nav id='nav-container'>
        <ul>
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
      </ul>
      </nav>
    )
  }
}

export default NavBar;
