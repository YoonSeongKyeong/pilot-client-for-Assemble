import { JOIN_USER_REQUEST, JOIN_USER_SUCCESS, JOIN_USER_FAILURE } from "../actionTypes";

const initialState = {
    isUserJoinSuccess: false,
    waitingUserJoin: false
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
    default:
      return state;
  }
}
