import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsThunk } from '../store/events';
import { Route } from "react-router-dom";
import ProtectedRoute from './auth/ProtectedRoute';
import HomepageLoggedIn from './HomepageLoggedIn';
import HomepageLoggedOut from './HomepageLoggedOut';

import './css/homepage.css';

function Homepage() {

    return useSelector((state) => state.session.user) ? (
        <ProtectedRoute>
            <HomepageLoggedIn />
        </ProtectedRoute>
    ) : (
        <Route>
            <HomepageLoggedOut />
        </Route>
    )
  }
  export default Homepage;
