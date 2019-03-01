import { combineReducers } from "redux";

// our reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  todo: todoReducer
});
