import { JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, JOIN_ROOM_FAILURE, OFF_ROOM } from "../actionTypes";

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
    case OFF_ROOM: {
      return {
        ...state,
        roomId: null
      };
    }
    default:
      return state;
  }
}
