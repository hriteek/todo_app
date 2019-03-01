import { GET_TODO, ADD_TODO, DELETE_TODO } from "../actions/types";

const initialState = {
  todo: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
        todo: action.payload
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter(singleTodo => singleTodo._id !== action.payload)
      };
    case ADD_TODO:
      return {
        ...state,
        todo: [action.payload, ...state.todo]
      };
    default:
      return state;
  }
};
