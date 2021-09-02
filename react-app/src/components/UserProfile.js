import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserEventsThunk } from "../store/events";
import { getASingleUserThunk } from "../store/session";
import './css/profilepage.css'

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [profileUser, setProfileUser] = useState({});
    const [userEvents, setUserEvents] = useState({})
    const [isCurrentUser, setIsCurrentUser] =useState(false);

    const user = useSelector(state => state.session.user)
    const currentUserEvents = useSelector(state => state.userInfo.userEvents)


    useEffect(() => {
        if (user.id === +userId){
            setIsCurrentUser((prevState) => !prevState)
            setProfileUser(user)
            setUserEvents(currentUserEvents)
        } else {
            (async () => {
                const user = await dispatch(getASingleUserThunk(userId));
                setProfileUser(user);
                const oneUserEvents = await dispatch(getOneUserEventsThunk(userId))
                setUserEvents(oneUserEvents)
            })();

        }

	}, [userId, currentUserEvents, dispatch]);


    return (
        <div id='profile-page'>
            <div id='user-info-conatiner'>
                <h1>{isCurrentUser ? "Your Profile" : profileUser.user_name}</h1>
                <img id='user-image' src={profileUser.user_img}></img>
                <p>{profileUser.description}</p>
            </div>
                <h1 id='created-events_header'>{isCurrentUser ? "Your" : profileUser.user_name + "'s" } Created Events:</h1>
            <div id = 'profile-events'>
               {userEvents && Object.values(userEvents).map(event =>(
                   <div className='profile-event-container' key={event.id}>
                       <h1>{event.event_title}</h1>
                       <p>{event.description}</p>
                   </div>

               ))}
            </div>
        </div>
    )
}


export default UserProfile
