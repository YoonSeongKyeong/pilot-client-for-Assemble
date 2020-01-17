import { CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE } from "../actionTypes";

const initialState = {
    isRoomCreationSuccess: false,
    waitingRoomCreate: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_REQUEST: {
      return {
        ...state,
        waitingRoomCreate:true
      };
    }
    case CREATE_ROOM_SUCCESS: {
      return {
        ...state,
        isRoomCreationSuccess:true,
        waitingRoomCreate:false
      };
    }
    case CREATE_ROOM_FAILURE: {
      return {
        ...state,
        isRoomCreationSuccess:false,
        waitingRoomCreate:false
      };
    }
    default:
      return state;
  }
}
