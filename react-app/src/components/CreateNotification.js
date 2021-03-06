import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../store/messages";


const CreateNotification = () => {
	const [errors, setErrors] = useState([]);
	const [text, setText] = useState("");
	const [to_user_id, setToUserId] = useState(null);
    const [users, setUsers] = useState([]);


	const dispatch = useDispatch();



        useEffect(() => {
            async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
            }
            fetchData();
        }, []);


		const handleCancel = (e) => {
			e.preventDefault()
			setErrors([])
			setText("")
			setToUserId(null)
		}




	const handleSubmit = async (e, error= false) => {
		e.preventDefault();
			setErrors([]);



		if (text.length < 5 || text.length > 1000 ) {
			error= true;
			setErrors(prevState => [...prevState, "Message text is incorrect length."])
		}

		if (!to_user_id) {
			error= true;
			setErrors(prevState => [...prevState, "You must select a user."])
		}


			if (!error) {

				const data = {
					text,
					to_user_id,
					invite: false
				};

				if (data) {
					const messageData = await dispatch(createMessageThunk(data));

						if (messageData) {
							setErrors(messageData.errors)
						}
				}
			}

    };


	return (

			<form id="create_notification" onSubmit={handleSubmit}>
				{errors.map((error, ind) => (
					<div className='edit_notification-errors' key={ind}>{error}</div>
				))}

				<label htmlFor="">To User: </label>
				<select
					name="users"
					onChange={(e) => setToUserId(e.target.value)}
					defaultValue="Select Users"
				>
					<option disabled>Select Users</option>
					{users.map((user) => (
                        <option key={user.id} value={user.id}>
							{user.user_name}
						</option>
					))}
				</select>

				<label htmlFor="text">Text</label>
				<textarea
					name="text"
					type="text"
					autoComplete="off"
					placeholder="Your Message Here"
					rows="2" cols="33"
					value={text}
					required
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<div className='create-notif_button_div'>
					<button
						id=""
						type="submit"
					>Create Notification
					</button>
					<button onClick={(e)=> handleCancel(e)}>Cancel</button>
				</div>
			</form>

	);
}

export default CreateNotification;
