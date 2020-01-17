import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from "../actionTypes";

const initialState = {
    isUserCreationSuccess: false,
    waitingUserCreate: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        waitingUserCreate:true
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        isUserCreationSuccess:true,
        waitingUserCreate:false
      };
    }
    case CREATE_USER_FAILURE: {
      return {
        ...state,
        isUserCreationSuccess:false,
        waitingUserCreate:false
      };
    }
    default:
      return state;
  }
}
