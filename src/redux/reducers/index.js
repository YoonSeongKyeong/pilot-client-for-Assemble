import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import createRoom from "./createRoom";

export default combineReducers({ todos, visibilityFilter, createRoom });
