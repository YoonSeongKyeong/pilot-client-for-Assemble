import {handleActions} from 'redux-actions';

import axios from 'axios';

const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING';
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILUER';

const LOGOUT = 'LOGOUT';

axios.defaults.withCredentials = true;

///rooms/:room_id

function postLoginAPI(data) {
  return axios.post('http://localhost:3001//rooms/:room_id', data);
}

function postLogoutAPI() {
  return axios.post('http://localhost:3001//rooms/:room_id');
}

const initialState = {
  pending: false,
  error: false,
  isLogin: localStorage.getItem('isLogin') === 'true'
};

export const login = data => dispatch => {
  dispatch({ type: POST_LOGIN_PENDING });

  return postLoginAPI(data)
    .then(result => {
      alert("입장이 성공했습니다!")
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: result.data
      });
    })
    .catch(error => {
      alert(error.response.data)
      dispatch({
        type: POST_LOGIN_FAILURE,
        payload: error
      });
      throw error;
    });
};

export const logout = data => dispatch => {
  return postLogoutAPI().then(result => {
    dispatch({ type: LOGOUT });
  });
};

export default handleActions(
  {
    [POST_LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLogin: false
      };
    },
    [POST_LOGIN_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
        isLogin: true
      };
    },
    [POST_LOGIN_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        isLogin: false
      };
    },
    [LOGOUT]: (state, action) => {
      return {
        ...state,
        isLogin: false
      };
    }
  },
  initialState
);
