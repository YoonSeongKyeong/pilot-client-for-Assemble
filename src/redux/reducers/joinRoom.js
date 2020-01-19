import { JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, JOIN_ROOM_FAILURE, OFF_ROOM, MEMORY_EMPTY, MEMORY_JOIN_ROOM, MEMORY_JOIN_USER, MEMORY_REQUEST } from "../actionTypes";

const initialState = {
    isRoomJoinSuccess: false,
    waitingRoomJoin: false,
    roomId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM_REQUEST: {
      return {
        ...state,
        waitingRoomJoin:true
      };
    }
    case JOIN_ROOM_SUCCESS: {
      return {
        ...state,
        isRoomJoinSuccess:true,
        waitingRoomJoin:false,
        roomId: action.roomId
      };
    }
    case JOIN_ROOM_FAILURE: {
      return {
        ...state,
        isRoomJoinSuccess:false,
        waitingRoomJoin:false
      };
    }
    case MEMORY_REQUEST: {
      return {
        ...state,
        waitingRoomJoin: true
      };
    }
    case MEMORY_JOIN_USER: {
      return {
        ...state,
        roomId: action.roomId,
        isRoomJoinSuccess: true,
        waitingRoomJoin: false
      };
    }
    case MEMORY_JOIN_ROOM: {
      return {
        ...state,
        roomId: action.roomId,
        isRoomJoinSuccess: true,
        waitingRoomJoin: false
      };
    }
    case MEMORY_EMPTY: {
      return {
        ...state,
        roomId: null,
        waitingRoomJoin: false
      };
    }
    case OFF_ROOM: {
      return {
        ...state,
        isRoomJoinSuccess:false,
        roomId: null
      };
    }
    default:
      return state;
  }
}
