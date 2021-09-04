
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUser } from '../store/UserInfo';
import CreateNotification from './CreateNotification';
import Notification from './Notification';
import { Modal } from './Context/Modal';
import { login } from '../store/session';

import "./css/navbar.css";
import MultiModal from './UserMessages/'

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
          <li className='nav_li'>
            <NavLink className='nav_a' to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='nav_li'>
            <NavLink className='nav_a' to={`/user/${user.id}`}>
              Profile
            </NavLink>
          </li>
          <li className='nav_li'>
            <LogoutButton />
          </li>
        </ul>
        </div>
      </div>
    <MultiModal />
    </nav>
  );
  } else {
    return (
      <nav id='nav-container'>
          <button onClick={demoUserLogin}>
            DEMO
          </button>
          <MultiModal />
      </nav>
    )
  }
}

export default NavBar;
