import { JOIN_USER_REQUEST, JOIN_USER_SUCCESS, JOIN_USER_FAILURE, MEMORY_EMPTY, MEMORY_JOIN_ROOM, MEMORY_JOIN_USER, MEMORY_REQUEST, OFF_USER } from "../actionTypes";

const initialState = {
    isUserJoinSuccess: false,
    waitingUserJoin: false,
    username: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOIN_USER_REQUEST: {
      return {
        ...state,
        waitingUserJoin:true
      };
    }
    case JOIN_USER_SUCCESS: {
      return {
        ...state,
        isUserJoinSuccess:true,
        waitingUserJoin:false,
        username: action.username
      };
    }
    case JOIN_USER_FAILURE: {
      return {
        ...state,
        isUserJoinSuccess:false,
        waitingUserJoin:false
      };
    }
    case MEMORY_REQUEST: {
      return {
        ...state,
        waitingUserJoin: true
      };
    }
    case MEMORY_JOIN_USER: {
      return {
        ...state,
        username: action.username,
        isUserJoinSuccess: true,
        waitingUserJoin: false
      };
    }
    case MEMORY_JOIN_ROOM: {
      return {
        ...state,
        username: action.username,
        isUserJoinSuccess: true,
        waitingUserJoin: false
      };
    }
    case MEMORY_EMPTY: {
      return {
        ...state,
        username: null,
        waitingUserJoin: false
      };
    }
    case OFF_USER: {
      return {
        ...state,
        isUserJoinSuccess:false,
        username: null
      };
    }
    default:
      return state;
  }
}
