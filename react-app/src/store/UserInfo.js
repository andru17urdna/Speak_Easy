const GET_USER_MESSAGES = "messages/GET_USER_MESSAGES"
// const ADD_TO_USER_MESSAGES ="messages/ADD_TO_USER_MESSAGES"
const CREATE_MESSAGE = "messages/CREATE_MESSAGE"
const DELETE_MESSAGE_FROM_USER = "messages/DELETE_MESSAGE_FROM_USER"
const DELETE_MESSAGE_TO_USER = "messages/DELETE_MESSAGE_TO_USER"

const getUserMessages = (toUserMessages, fromUserMessages) => ({
    type: GET_USER_MESSAGES,
    toUserMessages,
    fromUserMessages
})

const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    payload: message
})


const deleteMessageFromUser = (id) => ({
    type: DELETE_MESSAGE_FROM_USER,
    payload: id
})


const deleteMessageToUser = (id) => ({
    type: DELETE_MESSAGE_TO_USER,
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
            console.log(to_user_messages.errors, from_user_messages.errors)
			return;
		}
		dispatch(getUserMessages(to_user_messages, from_user_messages));
	}
}

export const createUserMessage = (message) => async (dispatch) => {
    dispatch(createMessage(message))
}

export const deleteMessagesFromUser = (id) => async (dispatch) => {
    dispatch(deleteMessageFromUser(id))
}

export const deleteMessagesToUser = (id) => async(dispatch) => {
    dispatch(deleteMessageToUser(id))
}

export const editUserMessages = (messageData) => (dispatch) => {
    dispatch(createMessage(messageData))
}


const initialState = { toUserMessages: {}, fromUserMessages: {} };


export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_MESSAGES:
            const newUserMessagesState = {
            toUserMessages: {...state.toUserMessages},
            fromUserMessages: {...state.fromUserMessages} }
            newUserMessagesState.toUserMessages = action.toUserMessages
            newUserMessagesState.fromUserMessages = action.fromUserMessages
            return newUserMessagesState
        case CREATE_MESSAGE:
            const newCreateState = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages, [action.payload.id]:action.payload}  }
            return newCreateState
        case DELETE_MESSAGE_FROM_USER:
            const newDeleteStateFromUser = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages}}
            delete newDeleteStateFromUser.fromUserMessages[action.payload]
            return newDeleteStateFromUser
        case DELETE_MESSAGE_TO_USER:
            const newDeleteStateToUser = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages}}
                console.log(action.payload, "MESSAGE TO USER")
                delete newDeleteStateToUser.toUserMessages[action.payload]
            return newDeleteStateToUser
        default:
            return state
    }
}
