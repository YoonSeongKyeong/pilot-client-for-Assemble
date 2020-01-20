import { combineReducers } from "redux";
import createRoom from "./createRoom";
import joinRoom from "./joinRoom";
import createUser from "./createUser";
import joinUser from "./joinUser";
import realtimeManager from "./realtimeManager";

export default combineReducers({ createRoom, joinRoom, createUser, joinUser, realtimeManager});
