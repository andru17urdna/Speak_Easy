import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { editEventThunk } from "../../store/events";



const EditEventForm = ({showEditField, setShowEditField, event}) => {
	const [errors, setErrors] = useState([]);
	const [event_title, setEventTitle] = useState(event.event_title);
	const [description, setDescription] = useState(event.description);
	const [event_img, setEventImg] = useState(event.event_img);
	const [event_date, setEventDateTime] = useState(new Date(event.event_date).toISOString().slice(0,-1));
    const dispatch = useDispatch();



	const handleSubmit = async (e, error= false) => {
		e.preventDefault();

        setErrors([]);

		if (event_title.length < 10) {
			error= true;
			setErrors(prevState => [...prevState, "Event title must be over 10 char."])
		}

        if (event_title.length > 50) {
            error= true;
            setErrors(prevState => [...prevState, "Event title must be under 50 char."])
        }

		if (description.length < 20) {
			error = true;
			setErrors(prevState => [...prevState, "Description must be over 20 characters."])
		}

		if (description.length > 75) {
			error = true;
			setErrors(prevState => [...prevState, "Description must be under 255 characters."])
		}

		if (event_img.length > 1000) {
			error = true;
			setErrors(prevState => [...prevState, "Event Image url is too long."])
		}

		if (event_date.length === 0) {
			error = true;
			setErrors(prevState => [...prevState, "You must enter a date."])
		}

		const data = {
            event_title,
            description,
            event_img,
            event_date: event_date.split('T').join(" "),
            private_event: false
        };

        if (!error) {
            if (data) {
                await dispatch(editEventThunk(data, event.id));
                setShowEditField(!showEditField);
            }
        }


    }


        return (
            <>
                    <h2 className='edit_event-header'>Edit Event</h2>
                <form id='edit-event_form' onSubmit={handleSubmit}>
                    {errors.map((error, ind) => (
                        <div className='event-edit_errors' key={ind}>{error}</div>
                    ))}


                    <label htmlFor="title">Event Title</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Title of Event"
                        value={event_title}
                        required
                        onChange={(e) => {
                            setEventTitle(e.target.value);
                        }}
                    />

                    <label htmlFor="description">Description</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="Event Description Here"
                        value={description}
                        required
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <label htmlFor="event-img">Event Image</label>
                    <input
                        name="event-img"
                        type="text"
                        placeholder="URL link to image"
                        value={event_img}
                        onChange={(e) => {
                            setEventImg(e.target.value);
                        }}
                    />
                    <label htmlFor="event-date-time">Event Date and Time</label>
                    <input
                        type="datetime-local"
                        name="event-date-time"
                        required
                        onChange={(e) => {
                            setEventDateTime(e.target.value);
                        }}
                        value={event_date}
                    />
                    <div className='edit-event_button_div'>
                        <button
                            id=""
                            type="submit"
                            disabled={false}
                        >Edit Event?
                        </button>
                    </div>
                </form>
            </>
        );
}


export default EditEventForm;
