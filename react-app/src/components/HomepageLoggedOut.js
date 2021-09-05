import React from 'react';
import { login } from '../store/session';
import { useDispatch } from 'react-redux';
import MultiModal from './UserMessages/';

import './css/splashpage.css';



const HomepageLoggedOut = () => {
  const dispatch = useDispatch();

  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };
  return (
        <div id='splash-page_container-div'>
            <h1 id='splash-title_h1'>&nbsp;&nbsp;SPEAK EASY&nbsp;&nbsp;</h1>
          <p id='splash-page_create-p'>Create Events</p>
          <p id='splash-page_send'>Send Notifications</p>
          <p id='splash-page_account'>Sign up for an account</p>

          <p id='demo_login' className="splash-page_nav" onClick={demoUserLogin}>
          &nbsp;&nbsp;Demo&nbsp;&nbsp;
            </p>
            <MultiModal />
        </div>

)};

export default HomepageLoggedOut;
