import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE
} from "./actionTypes";
import Axios from "axios";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {
    id
  }
});

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: {
    filter
  }
});

export const createRoom = form => (dispatch, getState) => {
  dispatch({
    type: CREATE_ROOM_REQUEST,
  })
  Axios.post(`http://localhost:3000/rooms`, {
    password: form.password,
    roomname: form.roomname
  }).then(
    (res) => {// process after creating room finished
      dispatch({type: CREATE_ROOM_SUCCESS})
      alert("CREATING ROOM SUCCESS, Room Id : "+ res.data.id)
    },
    (error) => dispatch({type: CREATE_ROOM_FAILURE, error: error})
  )
};

export const joinRoom = form => (dispatch, getState) => {
  dispatch({
    type: JOIN_ROOM_REQUEST,
  })
  Axios.post(`http://localhost:3000/rooms/${form.roomId}`, {
    password: form.password
  }).then(
    (res) => {// process after joining room finished
      dispatch({type: JOIN_ROOM_SUCCESS})
      alert("JOIN ROOM SUCCESS. now connecting...")
    },
    (error) => dispatch({type: JOIN_ROOM_FAILURE, error: error})
  )
};