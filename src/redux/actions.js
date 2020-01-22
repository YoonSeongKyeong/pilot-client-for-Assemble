import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  OFF_ROOM,
  NEW_PERSON,
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
  NEW_SCHEDULE_LIST,
  SUBMIT_SCHEDULE_REQUEST,
  SUBMIT_SCHEDULE_SUCCESS,
  SUBMIT_SCHEDULE_FAILURE,
  NEW_PLACE_LIST,
  SUBMIT_PLACE_REQUEST,
  SUBMIT_PLACE_SUCCESS,
  SUBMIT_PLACE_FAILURE,
  NEW_ACTIVITY_LIST,
  SUBMIT_ACTIVITY_REQUEST,
  SUBMIT_ACTIVITY_SUCCESS,
  SUBMIT_ACTIVITY_FAILURE,
  NEW_MENU_LIST,
  SUBMIT_MENU_REQUEST,
  SUBMIT_MENU_SUCCESS,
  SUBMIT_MENU_FAILURE,
  NEW_CHAT,
  SUBMIT_CHAT_REQUEST,
  SUBMIT_CHAT_SUCCESS,
  SUBMIT_CHAT_FAILURE
} from "./actionTypes";
import Axios from "axios";
import socketio from 'socket.io-client';


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

export const joinRoom = (form, history) => (dispatch, getState) => {
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
      history.push(`/rooms/${form.roomId}`)
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
    (error) => {dispatch({type: GET_MODEL_FAILURE})
      console.error(error)
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
        dispatch({type: NEW_CHAT, msg: msg})
      });
      socket.on('new person', (newPerson) => {// 새 person이 들어왔을 때의 로직
        dispatch({ type: NEW_PERSON, newPerson: newPerson })
      });
      socket.on('delete person', (msg) => {
        console.log("delete person: ", msg);
          // msg에는 삭제할 사람의 name이 담겨 있다. 
          // 모델에서 name에 해당하는 data를 삭제하고,
          // 만약 자신이 delete person이라면 socket.disconnect를 실행한다.
      });
      socket.on('new schedule_list', ({name, avail_schedules_list}) => {
        dispatch({ type: NEW_SCHEDULE_LIST, updaterName: name, avail_schedules_list: avail_schedules_list })
      });
      socket.on('new place_list', ({name, avail_places_list}) => {
        dispatch({ type: NEW_PLACE_LIST, updaterName: name, avail_places_list: avail_places_list })
      });
      socket.on('new activity_list', ({name, activity_list}) => {
        dispatch({ type: NEW_ACTIVITY_LIST, updaterName: name, activity_list: activity_list })
      });
      socket.on('new menu_list', ({name, menu_list}) => {
        dispatch({ type: NEW_MENU_LIST, updaterName: name, menu_list: menu_list })
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

export const joinUser = (form, history) => (dispatch, getState) => {
  dispatch({
    type: JOIN_USER_REQUEST,
  })
  debugger
  let {roomId} = getState().joinRoom
  Axios.get(`http://localhost:3000/rooms/${roomId}/people/${form.username}`, {withCredentials: true}).then(
    (res) => {
      dispatch({type: JOIN_USER_SUCCESS, username: form.username})
      alert("JOIN USER SUCCESS. now loading...")
      history.push(`${history.location.pathname}/people/${form.username}`)

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

export const submitSchedule = (avail_schedules_list) => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_SCHEDULE_REQUEST,
  })
  debugger
  let {roomId, myself:{name}} = getState().realtimeManager
  Axios.put(`http://localhost:3000/rooms/${roomId}/people/${name}/avail_schedules_list`, {
    avail_schedules_list: avail_schedules_list
  }).then(
    (res) => {
      dispatch({type: SUBMIT_SCHEDULE_SUCCESS})
      alert("POST SCHEDULE SUCCESS.")
    },
    (error) => {
      dispatch({type: SUBMIT_SCHEDULE_FAILURE, error: error})
      alert("POST SCHEDULE FAILURE.")
    })
};

export const submitPlace = (avail_places_list) => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_PLACE_REQUEST,
  })
  debugger
  let {roomId, myself:{name}} = getState().realtimeManager
  Axios.put(`http://localhost:3000/rooms/${roomId}/people/${name}/avail_places_list`, {
    avail_places_list: avail_places_list
  }).then(
    (res) => {
      dispatch({type: SUBMIT_PLACE_SUCCESS})
      alert("POST PLACE SUCCESS.")
    },
    (error) => {
      dispatch({type: SUBMIT_PLACE_FAILURE, error: error})
      alert("POST PLACE FAILURE.")
    })
};

export const submitActivity = (activity_list) => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_ACTIVITY_REQUEST,
  })
  let {roomId, myself:{name}} = getState().realtimeManager
  Axios.put(`http://localhost:3000/rooms/${roomId}/people/${name}/activity_list`, {
    activity_list: activity_list
  }).then(
    (res) => {
      dispatch({type: SUBMIT_ACTIVITY_SUCCESS})
      alert("POST ACTIVITY SUCCESS.")
    },
    (error) => {
      dispatch({type: SUBMIT_ACTIVITY_FAILURE, error: error})
      alert("POST ACTIVITY FAILURE.")
    })
};

export const submitMenu = (menu_list) => (dispatch, getState) => {
  dispatch({
    type: SUBMIT_MENU_REQUEST,
  })
  let {roomId, myself:{name}} = getState().realtimeManager
  Axios.put(`http://localhost:3000/rooms/${roomId}/people/${name}/menu_list`, {
    menu_list: menu_list
  }).then(
    (res) => {
      dispatch({type: SUBMIT_MENU_SUCCESS})
      alert("POST MENU SUCCESS.")
    },
    (error) => {
      dispatch({type: SUBMIT_MENU_FAILURE, error: error})
      alert("POST MENU FAILURE.")
    })
};

//! /rooms/:room_id/chats
export const postChat = (new_chat) => (dispatch, getState) => {
  console.log(new_chat)
  dispatch({
    type: SUBMIT_CHAT_REQUEST,
  })
  let {roomId} = getState().realtimeManager
  Axios.post(`http://localhost:3000/rooms/${roomId}/chats`, new_chat, {withCredentials: true})
  .then((res) => {
    dispatch({type: SUBMIT_CHAT_SUCCESS})
    
  },
  (error) => {
    dispatch({type: SUBMIT_CHAT_FAILURE, error: error})
    alert("POST CHAT FAILURE.")
  })
  
}


