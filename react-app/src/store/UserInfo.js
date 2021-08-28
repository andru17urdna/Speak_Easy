const GET_USER_MESSAGES = "messages/GET_USER_MESSAGES"
// const ADD_TO_USER_MESSAGES ="messages/ADD_TO_USER_MESSAGES"
const CREATE_MESSAGE = "messages/CREATE_MESSAGE"
const DELETE_MESSAGE = "messages/DELETE_MESSAGE"

const getUserMessages = (toUserMessages, fromUserMessages) => ({
    type: GET_USER_MESSAGES,
    toUserMessages,
    fromUserMessages
})

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    payload: message
})


const deleteMessageForUser = (id) => ({
    type: DELETE_MESSAGE,
    payload: id
})



// const addToUserMessages = (messages) => ({
//     type: ADD_TO_USER_MESSAGES,
//     payload: messages
// })


// export const populateUserMessagesThunk = (payload) => async (dispatch) => {
//     const response = await fetch("/api/messages/", {
//         method: "PATCH",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const { toUserMessages } = await response.json();
// 		if (toUserMessages.errors) {
// 			return;
// 		}
// 		dispatch(addUserMessages(toUserMessages));
// 	}

// }



export const getMessagesByUser = (id) => async (dispatch) => {
    console.log(id)
    const response = await fetch(`/api/messages/users/${id}`)

    if (response.ok) {
		const { to_user_messages, from_user_messages } = await response.json();
		if (to_user_messages.errors || from_user_messages.errors) {
			return;
		}
		dispatch(getUserMessages(to_user_messages, from_user_messages));
	}
}

export const createUserMessage = (message) => async (dispatch) => {
    console.log(message, 'user message')
    dispatch(createMessage(message))
}

export const deleteUserMessages = (id) => async (dispatch) => {
    dispatch(deleteMessageForUser(id))
}


export const editUserMessages = (messageData) => (dispatch) => {
    dispatch(createMessage(messageData))
}


const initialState = { toUserMessages: {}, fromUserMessages: {} };


export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_MESSAGES:
            const newUserMessagesState = { ...state }
            newUserMessagesState.toUserMessages = action.toUserMessages
            newUserMessagesState.fromUserMessages = action.fromUserMessages
            return newUserMessagesState
        case CREATE_MESSAGE:
            console.log(action.payload,"HEHEERHERHERHREHERHREHREHR")
            const newCreateState = { ...state.toUserMessages, [action.payload.id]:action.payload }
            return newCreateState
        case DELETE_MESSAGE:
            const newDeleteState = { ...state }
            delete newDeleteState.toUserMessages[action.payload]
            return newDeleteState
        default:
            return state
    }
}
