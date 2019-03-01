import { SET_CURRENT_USER } from "../actions/types";

import empty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !empty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
