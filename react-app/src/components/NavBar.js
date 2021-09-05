
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import speakEasyLogo from './SpeakEasyLogo.png'

import "./css/navbar.css";
import MultiModal from './UserMessages/'

const NavBar = () => {



    const user = useSelector(state => state.session.user)


    if (user) {

  return (
    <nav id='nav-container'>
      <NavLink id='logo-home_nav' to='/'><span className="material-icons">home</span></NavLink>
        <div className="dropdown">
          {user && (<span>{user.user_name}<span className="material-icons">
                expand_more</span></span>)}
        <div className='dropdown-content'>
        <ul>
          <li className='nav_li'>
            <NavLink className='nav_a' to='/' exact={true} activeClassName='active'>Home
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
  )} else {
    return (<></>) }
}

export default NavBar;
