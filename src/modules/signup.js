import { handleActions } from 'redux-actions';

import axios from 'axios';

const POST_SIGNUP_PENDING = 'POST_SIGNUP_PENDING';
const POST_SIGNUP_SUCCESS = 'POST_SIGNUP_SUCCESS';
const POST_SIGNUP_FAILURE = 'POST_SIGNUP_FAILUER';

axios.defaults.withCredentials = true;

function postSignupAPI(data) {
  return axios.post('http://localhost:3001/rooms', data);
}

const initialState = {
  pending: false,
  error: false,
  data: null,
};

export const signup = (data) => (dispatch) => {
  dispatch({ type: POST_SIGNUP_PENDING });

  return postSignupAPI(data)
    .then((result) => {
      alert('정상적으로 방을 생성했습니다!');
      dispatch({
        type: POST_SIGNUP_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      alert(error.response.data);
      dispatch({
        type: POST_SIGNUP_FAILURE,
        payload: error,
      });
      throw error;
    });
};

export default handleActions(
  {
    [POST_SIGNUP_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [POST_SIGNUP_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [POST_SIGNUP_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState,
);
