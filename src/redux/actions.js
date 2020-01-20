import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  OFF_ROOM,
  MEMORY_REQUEST,
  MEMORY_JOIN_ROOM,
  MEMORY_JOIN_USER,
  MEMORY_EMPTY,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  JOIN_USER_REQUEST,
  JOIN_USER_SUCCESS,
  JOIN_USER_FAILURE,
  GET_MODEL_REQUEST,
  GET_MODEL_SUCCESS,
  GET_MODEL_FAILURE,
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_FAILURE,
  OFF_USER,
  CREATE_ACTIVITY,
  CLEAR_CHANGE_IN_ACTIVITY
} from "./actionTypes";
import Axios from "axios";
import socketio from 'socket.io-client';

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
    (error) => {
      dispatch({type: CREATE_ROOM_FAILURE, error: error})
      alert("CREATING ROOM FAILURE.")
    })
};

export const joinRoom = (form, props) => (dispatch, getState) => {
  dispatch({
    type: JOIN_ROOM_REQUEST,
  })
  Axios.post(`http://localhost:3000/rooms/${form.roomId}`, {
    password: form.password
  }, {withCredentials: true}).then(
    (res) => {// process after joining room finished
      debugger
      dispatch({type: JOIN_ROOM_SUCCESS, roomId: form.roomId})
      alert("JOIN ROOM SUCCESS. now loading...")
      props.history.push(`/rooms/${form.roomId}`)
    },
    (error) => {
      dispatch({type: JOIN_ROOM_FAILURE, error})
      alert("JOIN ROOM FAILURE.")
  })
};

let processAfterJoinUser = (dispatch, getState) => {
  let {roomId} = getState().joinRoom
  let {username} = getState().joinUser

  // process after joining user finished
  dispatch({type: GET_MODEL_REQUEST})// 모델 불러오기
  Axios.get(`http://localhost:3000/rooms/${roomId}/model`, {withCredentials: true}).then(
    (res) => {
      dispatch({type: GET_MODEL_SUCCESS, model: res.data, username: username})
    },
    (error) => {dispatch({type: GET_MODEL_FAILURE, error: error})
      dispatch()
      alert("GET MODEL FAILURE. 서버에서 모델을 불러오지 못했습니다.")
    })

    dispatch({type: CONNECT_SOCKET_REQUEST})
    const socket = socketio.connect('http://localhost:3000', {
      query: `roomId=${roomId}&name=${username}`
  });
  (() => {
      socket.emit('chat message', "hi!!!");
  
      socket.on('connect', () => {
        if(socket.connected) {
          dispatch({type: CONNECT_SOCKET_SUCCESS, socketId:socket.id})
        }
        else {
          dispatch({type: CONNECT_SOCKET_FAILURE})
        }
      });
      socket.on('drop', (msg) => {
        console.log("drop")
        socket.disconnect()
        // model data를 지우는 routine 실행
      });
      socket.on('chat message', (msg) => {
        console.log("chat message: ", msg);
      });
      socket.on('new person', (msg) => {
        console.log("new person: ", msg);
      });
      socket.on('delete person', (msg) => {
        console.log("delete person: ", msg);
          // msg에는 삭제할 사람의 name이 담겨 있다. 
          // 모델에서 name에 해당하는 data를 삭제하고,
          // 만약 자신이 delete person이라면 socket.disconnect를 실행한다.
      });
      socket.on('new activity_list', (msg) => {
        console.log("new activity_list: ", msg);
      });
  })();
}

export const shortcutFromMemory = (props) => (dispatch, getState) => {
  debugger
  dispatch({
    type: MEMORY_REQUEST,
  })
  Axios.get(`http://localhost:3000/rooms/memory`, {withCredentials: true}).then(
    (res) => {// process after fetching memory finished
      debugger
      if(res.data.room_id) {
        let roomId = res.data.room_id
        if(res.data.name) {
          let username = res.data.name
          alert(`JOINING TO USER : ${username} IN ROOM : ${roomId}`)
          dispatch({type: MEMORY_JOIN_USER, username: username, roomId: roomId })
          props.history.push(`/rooms/${roomId}/people/${username}`)

          processAfterJoinUser(dispatch, getState)
        }
        else {
          if(!getState().joinRoom.isRoomJoinSuccess) {alert(`JOINING TO ROOM : ${roomId}`)}
          dispatch({type: MEMORY_JOIN_ROOM, roomId: roomId })
          props.history.push(`/rooms/${roomId}`)
        }
      }
      else {
        dispatch({type: MEMORY_EMPTY})
        if(props.history.location.pathname !== '/') {
          alert(`NOT AUTHORIZED YET, PLEASE CREATE OR JOIN THE ROOM`)
          props.history.push(`/`)
        }
      }
    },
    (error) => {
      dispatch({type: MEMORY_EMPTY})
      if(props.history.location.pathname !== '/') {
        alert(`NOT AUTHORIZED YET, PLEASE CREATE OR JOIN THE ROOM`)
        props.history.push(`/`)
      }
  })
};

export const offRoom = (history) => (dispatch, getState) => {// offRoom has reducer in reducers/joinROOM
  Axios.get(`http://localhost:3000/rooms/disconnect`, {withCredentials: true}).then(
    (res) => {// process after joining room finished
      alert("OFF ROOM SUCCESS. now loading...")
      history.push('/')
      dispatch({
        type: OFF_ROOM,
      })
    },
    (error) => {
    alert("OFF ROOM FAILED")
  })
};

export const createUser = form => (dispatch, getState) => {
  dispatch({
    type: CREATE_USER_REQUEST,
  })
  let {roomId} = getState().joinRoom
  Axios.post(`http://localhost:3000/rooms/${roomId}/people`, {
    name: form.username
  }).then(
    (res) => {// process after creating user finished
      dispatch({type: CREATE_USER_SUCCESS})
      alert("CREATING USER SUCCESS, User Name : "+ form.username)
    },
    (error) => {dispatch({type: CREATE_USER_FAILURE, error: error})
    alert("CREATING USER FAILURE. 이미 존재하는 이름입니다.")
  })
  
};

export const joinUser = (form, props) => (dispatch, getState) => {
  dispatch({
    type: JOIN_USER_REQUEST,
  })
  debugger
  let {roomId} = getState().joinRoom
  Axios.get(`http://localhost:3000/rooms/${roomId}/people/${form.username}`, {withCredentials: true}).then(
    (res) => {
      dispatch({type: JOIN_USER_SUCCESS, username: form.username})
      alert("JOIN USER SUCCESS. now loading...")
      props.history.push(`${props.history.location.pathname}/people/${form.username}`)

      processAfterJoinUser(dispatch, getState)
    },
    (error) => {
      dispatch({type: JOIN_USER_FAILURE, error: error})
      alert("JOIN USER FAILURE. 존재하지 않는 이름입니다.")
    })
};

export const offUser = (history) => (dispatch, getState) => {// offUser has reducer in reducers/joinUser
  let {roomId} = getState().joinRoom
  let {socketId} = getState().realtimeManager
  Axios.get(`http://localhost:3000/rooms/${roomId}/people/disconnect/?socket_id=${socketId}`, {withCredentials: true}).then(
    (res) => {// process after joining User finished
      alert("OFF USER SUCCESS. now loading...")

      // process before going out from the room
      history.push(`/rooms/${roomId}`)
      dispatch({
        type: OFF_USER,
      })
    },
    (error) => {
    alert("OFF USER FAILED")
  })
};

export const createActivity = (content, isFavor) => ({
  type: CREATE_ACTIVITY,
  newActivity: {
    content: content,
    isFavor: isFavor
  }
})

export const submitActivity = () => (dispatch, getState) => {
};

export const clearChangeInActivity = () => (dispatch, getState) => {
  let {username} = getState().joinUser
  dispatch({type: CLEAR_CHANGE_IN_ACTIVITY, username: username})
};
