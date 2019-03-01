import axios from "../api/Backend";
import setAuthToken from "../utils/setAuthToken";
import decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/register", userData);
    if (res) {
      history.push("/login");
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.data[0]
    });
  }
};

export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/auth/login", userData);
    if (res) {
      //get the token from response
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // access user from token
      const decoded = decode(token);
      // set the current user
      dispatch(setCurrentUser(decoded));
      // redirect
      history.replace("/");
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.data[0]
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
