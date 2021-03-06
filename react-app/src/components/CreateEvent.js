import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEventThunk } from "../store/events";


const CreateEvent = ({showCreateEvent, setShowCreateEvent}) => {
	const [errors, setErrors] = useState([]);
	const [event_title, setEventTitle] = useState("");
	const [description, setDescription] = useState("");
	const [event_img, setEventImg] = useState("");
	const [event_date, setEventDateTime] = useState("");



	const dispatch = useDispatch();


	const handleCancel = (e) => {
		e.preventDefault()
		setErrors([])
		setEventTitle("")
		setDescription("")
		setEventImg("")
		setEventDateTime("")
		setShowCreateEvent(!showCreateEvent)
	}


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
			setErrors(prevState => [...prevState, "Description must be over 20 char."])
		}

		if (description.length > 75) {
			error = true;
			setErrors(prevState => [...prevState, "Description must be under 255 char."])
		}

		if (event_img.length > 1000) {
			error = true;
			setErrors(prevState => [...prevState, "Event Image url is too long."])
		}

		if (event_date.length === 0) {
			error = true;
			setErrors(prevState => [...prevState, "You must enter a date."])
		}


		if (!error) {

			const data = {
				event_title,
				description,
				event_img,
				event_date: event_date.split('T').join(" "),
				private_event: false
			};



			if (data) {

				const eventData = await dispatch(createEventThunk(data));
				setShowCreateEvent(!showCreateEvent);
				if (eventData.errors) {
					setErrors(eventData.errors)
				}
			}
		}

    };


	return (
		<div id="form-container">
			<form id="create-event_form" onSubmit={handleSubmit}>
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
			<div id='create-button_div'>
				<button
					id=""
					type="submit"
					disabled={false}
				>Create Event?
				</button>
				<button onClick={(e) => handleCancel(e)}> Cancel</button>
			</div>
			</form>
		</div>
	);
}

export default CreateEvent;
