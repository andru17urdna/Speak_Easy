
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUser } from '../store/UserInfo';
import CreateNotification from './CreateNotification';
import Notification from './Notification';
import { Modal } from './Context/Modal';
import { login } from '../store/session';
import UserMessagesModal from './UserMessages';

import "./css/navbar.css";
import UserMessages from './UserMessages/UserMessages';

const NavBar = () => {

    const dispatch = useDispatch();

    const [showMessages, setShowMessages] = useState(false);

    const user = useSelector(state => state.session.user)
    // const messagesToCurrentUser = useSelector(state => state.userInfo.toUserMessages)
    // const messagesFromCurrentUser = useSelector(state => state.userInfo.fromUserMessages)

    const demoUserLogin = async (e) => {
      e.preventDefault();
      await dispatch(login("demo@aa.io", "password"));
    };

    // useEffect(() => {
    //     if (user) {
    //         dispatch(getMessagesByUser(user.id))
    //     }
    // }, [dispatch, user])


    if (user) {

  return (
    <nav id='nav-container'>
      <NavLink to='/'>Home</NavLink>
      <div className="dropdown">
        {user && (<span>{user.user_name}<span class="material-icons">
              expand_more</span></span>)}
      <div className='dropdown-content'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/user/${user.id}`}>
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      </div>
    </div>
    <UserMessagesModal />
    </nav>
  );
  } else {

    return (
      <nav id='nav-container'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <button onClick={demoUserLogin}>
            DEMO
          </button>
      </nav>
    )
  }
}

export default NavBar;
