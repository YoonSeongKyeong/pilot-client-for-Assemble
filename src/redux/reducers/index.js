import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import createRoom from "./createRoom";
import joinRoom from "./joinRoom";
import createUser from "./createUser";

export default combineReducers({ todos, visibilityFilter, createRoom, joinRoom, createUser});
