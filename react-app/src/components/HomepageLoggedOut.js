import React, { useState } from 'react';
import { login } from '../store/session';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MultiModal from './UserMessages/';
import speakEasyLogo from './easyTRIM.png';

import './css/splashpage.css';



const HomepageLoggedOut = () => {
  const dispatch = useDispatch();

  const [showProjects, setShowProjects] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showAboutSite, setShowAboutSite] =useState(false);

  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };
  return (
        <div id='splash-page_container-div'>
            <h1 id='splash-title_h1'>&nbsp;&nbsp;SPEAK EASY&nbsp;&nbsp;</h1>
          <p id='splash-page_create-p'>Create & Plan Events</p>
          <p id='splash-page_send'>Send Notifications</p>
          <p id='splash-page_account'>Sign Up For An Account</p>
          <img id='speak-easy_logo' src={speakEasyLogo} alt='speak easy logo'></img>
          <p id='demo_login' className="splash-page_nav" onClick={demoUserLogin}>
          &nbsp;&nbsp;Demo&nbsp;&nbsp;
            </p>
            <MultiModal />
            <div id='footer'>
              <a className='splash-links' target="_blank" href='https://www.instagram.com/kirakajeevan/' id='logo-artist'>&nbsp;&nbsp;Logo Artist&nbsp;&nbsp;</a>
            <div onMouseEnter={() => setShowProjects(true)}
                 onMouseLeave={() => setShowProjects(false)} id='project_div'>

                <p>Andru's Projects</p>
              {showProjects && (
                <>
                <a className='splash-links' target="_blank" href="https://shuffled.herokuapp.com/">&nbsp;&nbsp;Shuffled&nbsp;&nbsp;</a>
                <a className='splash-links' target="_blank" href="https://spot-a-cloud.herokuapp.com/">&nbsp;&nbsp;Waveform&nbsp;&nbsp;</a>
                </>
              )}
            </div>
            <div onMouseEnter={() => setShowAboutSite(true)}
                 onMouseLeave={() => setShowAboutSite(false)} id='about-site_div'>
              <p>About Speak Easy</p>
              {showAboutSite && (
                <>
                  <a href='https://www.oldwestiron.com/blogs/news/everything-you-need-to-know-about-speakeasy-grills-and-doors' className='splash-links'>About Logo</a>
                  <a href='https://github.com/andru17urdna/Speak_Easy' className='splash-links'>Github Repo</a>
                </>
              )}
            </div>
            <div onMouseEnter={() => setShowAboutMe(true)}
                 onMouseLeave={() => setShowAboutMe(false)}  id='about-me_div'>

                <p>About Andru</p>
              {showAboutMe && (
              <>
                <a href='https://www.linkedin.com/in/andrew-watkins-533280173/' target="_blank" className='splash-links'>&nbsp;&nbsp;LinkedIn&nbsp;&nbsp;</a>
                <a href='https://github.com/andru17urdna' target="_blank" className='splash-links'>&nbsp;&nbsp;Github&nbsp;&nbsp;</a>
              </>
              )}
            </div>
            </div>
        </div>

)};

export default HomepageLoggedOut;
