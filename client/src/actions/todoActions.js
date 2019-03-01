import { GET_ERRORS, GET_TODO, ADD_TODO, DELETE_TODO } from "./types";

import axios from "../api/Backend";

export const getTodo = () => async dispatch => {
  try {
    const res = await axios.get("/api/todo");
    if (res) {
      dispatch({
        type: GET_TODO,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: null
    });
  }
};

export const addTodo = todo => async dispatch => {
  try {
    const res = await axios.post("/api/todo/", todo);
    if (res) {
      dispatch({
        type: ADD_TODO,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: null
    });
  }
};

export const deleteTodo = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/todo/${id}`);
    if (res) {
      dispatch({
        type: DELETE_TODO,
        payload: id
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: null
    });
  }
};
