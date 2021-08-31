import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { editEventThunk } from "../../store/events";



const EditEventForm = ({ event }) => {
	const [errors, setErrors] = useState([]);
	const [event_title, setEventTitle] = useState("");
	const [description, setDescription] = useState("");
	const [event_img, setEventImg] = useState("");
	const [event_date, setEventDateTime] = useState("08/25/2022 22:52:03");
	const [private_event, setPrivateEvent] = useState(false);
    const dispatch = useDispatch();
    

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			event_title,
			description,
			event_img,
            event_date,
            private_event
		};

        if (data) {
            const eventData = await dispatch(editEventThunk(data, event.id));
        }
    }


        return (
            <div id="">
                <form id="" onSubmit={handleSubmit}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
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
                        required
                        onChange={(e) => {
                            setEventImg(e.target.value);
                        }}
                    />
                    {/* <label htmlFor="event-date-time">Event Date and Time</label>
                    <input
                        type="datetime-local"
                        name="event-date-time"
                        value={event_date}
                    /> */}

                    <button
                        id=""
                        type="submit"
                        disabled={false}
                    >IT'S AN EVENT BUTTON COME ON
                    </button>
                </form>
            </div>
        );
}


export default EditEventForm;
