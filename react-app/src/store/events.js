import { createUserEventThunk,
         deleteUserEventThunk,
         editUserEventThunk } from "./UserInfo";




const GET_ALL_EVENTS = "events/GET_ALL_EVENTS"
const CREATE_EVENT = "events/CREATE_EVENT"
const DELETE_EVENT = "events/DELETE_EVENT"
const DROP_EVENTS = "events/DROP_EVENTS"

const getAllEvents = (events) => ({
    type: GET_ALL_EVENTS,
    payload: events
})

const createEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})


const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    payload: id
})

const dropEvents = () => ({
    type: DROP_EVENTS
})


export const getOneUserEventsThunk = (id) =>  async () => {
    const response = await fetch(`/api/events/user-events/${id}`);
    if (response.ok) {
        const oneUserEvents  = await response.json();
        return oneUserEvents;
    }
}


export const getOneEvent = (id) => async () => {
    const response = await fetch(`/api/events/${id}`)
    if (response.ok) {
        const oneEvent = await response.json();
        return oneEvent;
    }
}


export const getAllEventsThunk = () => async (dispatch) => {
    const response = await fetch("/api/events/");

    if (response.ok) {
        const { events } = await response.json();
        if (events.errors) {
            return
        }
        dispatch(getAllEvents(events))
    }
}

export const createEventThunk = (payload) => async (dispatch) => {
    const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
        dispatch(createEvent(data.event))
        dispatch(createUserEventThunk(data.event))
        return data
    }
}

export const editEventThunk = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data
        }
        dispatch(createEvent(data.event))
        dispatch(editUserEventThunk(data.event))
    }
}

export const deleteEventThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json()
            if(data.errors) {
                return
            }
            dispatch(deleteEvent(id))
            dispatch(deleteUserEventThunk(id))
    }
}


export const dropEvent = () => async (dispatch) => {
    dispatch(dropEvents())
}

const initialState = {};

export default function eventsReducer(state = initialState, action) {
    // Object.freeze(state);
    switch (action.type) {
        case GET_ALL_EVENTS:
            return action.payload
        case DELETE_EVENT:
            const newDeleteState = {...state}
            delete newDeleteState[action.payload]
            return newDeleteState
        case CREATE_EVENT:
            const newCreateState = {...state, [action.payload.id]: action.payload}
            return newCreateState
        case DROP_EVENTS:
            return initialState;
        default:
            return state
    }
}
