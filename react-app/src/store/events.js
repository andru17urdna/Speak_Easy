const GET_ALL_EVENTS = "events/GET_ALL_EVENTS"
const CREATE_EVENT = "events/CREATE_EVENT"
const DELETE_EVENT = "events/DELETE_EVENT"
const EDIT_EVENT = "events/EDIT_EVENT"

const getAllEvents = (events) => ({
    type: GET_ALL_EVENTS,
    payload: events
})

const createEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})

const editEvent = ({})

const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    payload: id
})

export const getAllEventsThunk = () => async (dispatch) => {
    const response = await fetch("/api/events");

    if (response.ok) {
        const { events } = await response.json();
        if (events.errors) {
            return
        }
        dispatch(getAllEvents(events))
    }
}

export const createEventThunk = (payload) => async (dispatch) => {
    const response = await fetch("/api/events", {
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
        console.log(data, "DATA")
        dispatch(createEvent(data))
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
        dispatch()
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
    }
}

const initialState = [];

export default function eventsReducer(state = initialState, action) {
    // Object.freeze(state);
    switch (action.type) {
        case GET_ALL_EVENTS:
            return action.payload
        case DELETE_EVENT:
            const newDeleteState = [...state]
            console.log(action.payload)
            delete newDeleteState[action.payload]
            return newDeleteState
        default:
            return state
    }
}
