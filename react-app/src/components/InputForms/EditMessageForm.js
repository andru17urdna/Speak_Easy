import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { editMessageThunk } from "../../store/messages";


const EditNotification = ({message, showEditField, setShowEditField}) => {
	const [errors, setErrors] = useState([]);
	const [text, setText] = useState(message.text);
	const [invite, setInvite] = useState(false);
	const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
    const [users, setUsers] = useState([]);


	const dispatch = useDispatch();



	const handleSubmit = async (e, error= false) => {
		e.preventDefault();
		setErrors([]);


		if (text.length < 5 || text.length > 1000 ) {
			error= true;
			setErrors(prevState => [...prevState, "Message text is incorrect length."])
		}

		if (!error) {

		const data = {
			text,
			to_user_id: message.to_user_id,
			invite
		};

			if (data) {
				const messageData = await dispatch(editMessageThunk(data, message.id));
				setShowEditField(!showEditField)
				if (messageData) {
					setErrors(messageData.errors)
				}
			}
		}
    };


	return (
		<>
			<form className='notification_edit-form' onSubmit={handleSubmit}>
				{errors.map((error, ind) => (
					<div className='edit_notification-errors' key={ind}>{error}</div>
				))}

				<label className='notification_text-label' htmlFor="text">Notification Text </label>
				<textarea
					name="text"
					type="text"
					placeholder="Your Message Here"
					value={text}
					rows="3" cols="33"
					required
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<button
					id=""
					type="submit"
					disabled={disabledSubmitButton}
				>Submit Edit?
				</button>
			</form>
		</>
	);
}

export default EditNotification;
