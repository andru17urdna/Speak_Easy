import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMessageThunk } from "../store/messages";


const CreateNotification = () => {
	const [errors, setErrors] = useState([]);
	const [text, setText] = useState("");
	const [to_user_id, setToUserId] = useState(null);
	const [invite, setInvite] = useState(false);
	const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
    const [users, setUsers] = useState([]);


	const dispatch = useDispatch();
	const history = useHistory();



        useEffect(() => {
            async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
            }
            fetchData();
        }, []);

        // console.log(users, "LIST OF USERS")




	// const imageFileEndings = ["pdf", "png", "jpg", "jpeg", "gif"];


	// const handleOptionClick = (e) => {
	// 	setGenres((prevGenres) => [...prevGenres, +e.target.value]);
	// };



	// 	const idx = to_user_id.indexOf(+e.target.value);
	// 	setToUserId((prevToUserId) =>
	// 		prevToUserId.slice(0, idx).concat(prevToUserId.slice(idx + 1))
	// 	);
	// };


	const handleSubmit = async (e) => {
		e.preventDefault();


		const data = {
			text,
			to_user_id,
			invite
		};


        if (data) {
                const messageData = await dispatch(createMessageThunk(data));


            }
        // console.log(messageData.errors)
		// if (messageData.errors) {
        //     setErrors(messageData.errors)
        // }
    };


	return (
		<div id="">
			<form id="" onSubmit={handleSubmit}>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
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

export default CreateNotification;
