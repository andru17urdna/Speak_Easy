import React from 'react';
import { useSelector } from 'react-redux';

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
