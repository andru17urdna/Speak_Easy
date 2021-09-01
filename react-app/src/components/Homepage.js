import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllEventsThunk } from '../store/events';

function Homepage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk())
    }, [dispatch]);


    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
  }
  export default Homepage;
