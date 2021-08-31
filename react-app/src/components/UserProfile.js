import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserEventsThunk } from "../store/events";
import { getASingleUserThunk } from "../store/session";

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
        <div>
            <div>
                <h1>{isCurrentUser ? "Your Profile" : profileUser.user_name}</h1>
                {/* <img src={profileUser.user_img}></img> */}
            </div>
            <div>
                <h1>{isCurrentUser ? "Your" : profileUser.user_name + "'s" } Created Events</h1>
               {userEvents && Object.values(userEvents).map(event =>(
                   <div key={event.id}>
                       <h1>{event.event_title}</h1>
                       <p>{event.description}</p>
                   </div>

               ))}
            </div>
        </div>
    )
}


export default UserProfile
