//======================== USER MESSAGES========================



const GET_USER_MESSAGES = "messages/GET_USER_MESSAGES"
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







export const getMessagesByUser = (id) => async (dispatch) => {
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



// ========================USER EVENTS============================



const GET_USER_EVENTS = "events/GET_USER_EVENTS"


const getUserEvents = (userEventData) => ({
    type: GET_USER_EVENTS,
    userEventData
})


export const getEventsByUser = (id) => async (dispatch) => {
    console.log(id)
    const response = await fetch(`/api/events/user-events/${id}`)
    console.log(response)
    if (response.ok) {
		const { user_event_data }  = await response.json();
		dispatch(getUserEvents(user_event_data));
	}
}







const initialState = { toUserMessages: {},
                       fromUserMessages: {},
                       userEvents: {} };


export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {



// =================== GET USER INFO=======================================
        case GET_USER_MESSAGES:
            const newUserMessagesState = {
            toUserMessages: {...state.toUserMessages},
            fromUserMessages: {...state.fromUserMessages},
            userEvents: {...state.userEvents} }
            newUserMessagesState.toUserMessages = action.toUserMessages
            newUserMessagesState.fromUserMessages = action.fromUserMessages
            return newUserMessagesState
        case GET_USER_EVENTS:
            const newUserEventsState = {
            toUserMessages: {...state.toUserMessages},
            fromUserMessages: {...state.fromUserMessages},
            userEvents: {...state.userEvents}}
            console.log(action.userEventData, "WORK")
            newUserEventsState.userEvents = action.userEventData
            return newUserEventsState



// ===================CREATE USER INFO=======================================
        case CREATE_MESSAGE:
            const newCreateState = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages, [action.payload.id]:action.payload},
                userEvents: {...state.userEvents}}
            return newCreateState



// ===================EDIT USER INFO=======================================




// ===================DELETE USER INFO=======================================
    //  "USER" here is in reference to the current logged in user
        case DELETE_MESSAGE_FROM_USER:
            const newDeleteStateFromUser = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages},
                userEvents: {...state.userEvents}}
            delete newDeleteStateFromUser.fromUserMessages[action.payload]
            return newDeleteStateFromUser
        case DELETE_MESSAGE_TO_USER:
            const newDeleteStateToUser = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages},
                userEvents: {...state.userEvents}}
                delete newDeleteStateToUser.toUserMessages[action.payload]
            return newDeleteStateToUser
        default:
            return state
    }
}
