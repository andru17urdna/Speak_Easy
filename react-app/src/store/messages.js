import { deleteMessagesFromUser,
         deleteMessagesToUser,
         editUserMessages,
         createUserMessage } from "./UserInfo"




const GET_ALL_MESSAGES = "messages/GET_ALL_MESSAGES"
const CREATE_MESSAGE = "messages/CREATE_MESSAGE"
const DELETE_MESSAGE = "messages/DELETE_MESSAGE"
const DROP_MESSAGES = "messages/DROP_MESSAGES"
const ADD_FRIEND = "notifications/ADD_FRIEND"


const getAllMessages = (messages) => ({
    type: GET_ALL_MESSAGES,
    payload: messages
})


const createMessage = (message) => ({
    type: CREATE_MESSAGE,
    payload: message
})

const deleteMessage = (id) => ({
    type: DELETE_MESSAGE,
    payload: id
})

const addFriend = (id) => ({
    type: ADD_FRIEND,
    payload: id
})

const dropMessages = () => ({
    type: DROP_MESSAGES
})



export const getAllMessagesThunk = () => async (dispatch) => {
    const response = await fetch('/api/messages')

    if (response.ok) {
        const { messages } = await response.json();
        if (messages.errors) {
            return
        }
        dispatch(getAllMessages(messages))
    }
}




export const createMessageThunk = (payload) => async (dispatch) => {

    const response = await fetch("/api/messages/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors){

            return data;
        }
        await dispatch(createUserMessage(data.message))
        await dispatch(createMessage(data.message))
    }
}

export const editMessageThunk = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data
        }
        dispatch(createMessage(data.message))
        dispatch(editUserMessages(data.message))
    }
}


export const deleteMessageThunk = (id, userId) => async (dispatch) => {

    const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json()
        if(data.errors) {
            return
        }
        dispatch(deleteMessage(id))
        if (data.currentUser === userId) {
            dispatch(deleteMessagesFromUser(id))
        }
        else {
            dispatch(deleteMessagesToUser(id))
        }
    }
}


export const addFriendThunk = (id) => async (dispatch) => {
    console.log('thunk')
    const response = await fetch(`/api/users/add-friend`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({id})
    })
    console.log(response.json())
}


export const dropMessage = () => async (dispatch) => {
    dispatch(dropMessages())
}



const initialState = {};

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return action.payload
        case CREATE_MESSAGE:
            const newCreateState = {...state, [action.payload.id]:action.payload}
            return newCreateState
        case DELETE_MESSAGE:
            const newDeleteState = {...state}
            delete newDeleteState[action.payload]
            return newDeleteState
        case DROP_MESSAGES:
            return initialState;
        default:
            return state
    }
}
