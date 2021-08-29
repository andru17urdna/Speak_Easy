import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteMessageThunk } from '../store/messages';


const EventTower = ({userEvent}) => {
    const [showEditField, setShowEditField] = useState(false);


  return (
      <>


          <h1>{userEvent.event_title}</h1>
          <h2>{userEvent.description}</h2>
          {/* <img src={userEvent.event_img} alt='userEvent' /> */}
          <button>DELETE</button>
          <button>EDIT</button>

      </>
  );
}

export default EventTower;
