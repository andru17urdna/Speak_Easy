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
const CREATE_USER_EVENT = "events/CREATE_EVENT"
const DELETE_USER_EVENT = "events/DELETE_EVENT"

const DROP_USER_INFO = "events/DROP_USER_INFO"

const getUserEvents = (userEventData) => ({
    type: GET_USER_EVENTS,
    userEventData
})

const createUserEvent = (event) => ({
    type: CREATE_USER_EVENT,
    payload: event
})

const deleteUserEvent = (id) => ({
    type: DELETE_USER_EVENT,
    payload: id
})

const dropUser = () => ({
    type: DROP_USER_INFO
})


export const getEventsByUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/events/user-events/${id}`)
    if (response.ok) {
		const user_event_data   = await response.json();
		dispatch(getUserEvents(user_event_data));
	}
}

export const createUserEventThunk = (data) => async (dispatch) => {
    dispatch(createUserEvent(data))
}

export const editUserEventThunk = (event) => async (dispatch) => {
    dispatch(createUserEvent(event))
}

export const deleteUserEventThunk = (id) => async (dispatch) => {
    dispatch(deleteUserEvent(id))
}

export const dropUserInfo = () => async (dispatch) => {
    dispatch(dropUser())
}


const initialState = { toUserMessages: {},
                       fromUserMessages: {},
                       userEvents: {} };


export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        
        case DROP_USER_INFO:
            return initialState;

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
            newUserEventsState.userEvents = action.userEventData
            return newUserEventsState



// ===============CREATE USER INFO OR EDIT CREATED INFO==========================
        case CREATE_MESSAGE:
            const newCreateState = {
            toUserMessages: {...state.toUserMessages},
            fromUserMessages: {...state.fromUserMessages, [action.payload.id]:action.payload},
            userEvents: {...state.userEvents}}
            return newCreateState;
        case CREATE_USER_EVENT:
            const newEventCreateState = {
            toUserMessages: {...state.toUserMessages},
            fromUserMessages: {...state.fromUserMessages},
            userEvents: {...state.userEvents, [action.payload.id]:action.payload}
            }
            return newEventCreateState;




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
        case DELETE_USER_EVENT:
            const newDeleteStateUserEvent = {
                toUserMessages: {...state.toUserMessages},
                fromUserMessages: {...state.fromUserMessages},
                userEvents: {...state.userEvents}
            }
            delete newDeleteStateUserEvent.userEvents[action.payload]
            return newDeleteStateUserEvent;
        default:
            return state
    }
}
