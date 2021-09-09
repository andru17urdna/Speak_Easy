import { dropEvent } from "./events";
import { dropUserInfo } from "./UserInfo";
import { dropMessage } from "./messages";
import { createMessageThunk } from "./messages";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_FRIEND = "notifications/ADD_FRIEND"


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})


const addFriend = (id) => ({
  type: ADD_FRIEND,
  payload: id
})


export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser())
    dispatch(dropEvent())
    dispatch(dropMessage())
    dispatch(dropUserInfo())
  }
};


export const signUp = (username, email, password, user_img, description) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      user_img,
      description
    }),
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


export const addFriendThunk = (id, currentUser) => async (dispatch) => {
  const response = await fetch(`/api/users/add-friend`, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify({id})
  })
    const data = await response.json()

    if (data.success) {
      const addedNoti = {
        text: `${currentUser} added you as a friend. Say hello!`,
        to_user_id: id,
        invite: false
      }
      
      await dispatch(addFriend(id))
      await dispatch(createMessageThunk(addedNoti))

      return data.success
    }
    if (data.error)
    return data
}

export const usernameCheck = (username) => async (dispatch) => {

  const response = await fetch('api/users/check-username', {
    method: 'PATCH',
    headers: {
    'Content-type': 'application/json',
  },
    body: JSON.stringify({ username })
  })

  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export const emailCheck = (email) => async (dispatch) => {

  const response = await fetch('api/users/check-email', {
    method: 'PATCH',
    headers: {
    'Content-type': 'application/json',
  },
    body: JSON.stringify({ email })
  })

  if (response.ok) {
    const data = await response.json();
    return data;
  }
}


export const getASingleUserThunk = (userId) => async () => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user = await response.json();
		if (user.errors) {
			return;
		}
		return user;
	}
};

const initialState = { user: null}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ADD_FRIEND:
      return { user: {

          description: state.user.description,
          email: state.user.email,
          friends: [...state.user.friends, action.payload],
          id: state.user.id,
          user_img: state.user.user_img,
          user_name: state.user.user_name

      }}
    default:
      return state;
  }
}
