import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { editMessageThunk } from "../../store/messages";


const EditNotification = ({message}) => {
	const [errors, setErrors] = useState([]);
	const [text, setText] = useState("");
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

				if (messageData) {
					setErrors(messageData.errors)
				}
			}
		}
    };


	return (
		<div id="">
			<form id="" onSubmit={handleSubmit}>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}

				<label htmlFor="text">Text</label>
				<input
					name="text"
					type="text"
					placeholder="Your Message Here"
					value={text}
					required
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<button
					id=""
					type="submit"
					disabled={disabledSubmitButton}
				>IT'S A BUTTON COME ON
				</button>
			</form>
		</div>
	);
}

export default EditNotification;
