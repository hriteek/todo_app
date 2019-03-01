import React from "react";

const SingleTodo = props => {
  const { todo } = props;
  return todo.map(singleTodo => (
    <div
      key={singleTodo._id}
      className="container text-center border border-primary mt-2 p-2"
    >
      <button
        className="btn btn-danger float-left"
        onClick={() => props.onClickHandler(singleTodo._id)}
      >
        &times;
      </button>
      <p>{singleTodo.content}</p>
    </div>
  ));
};
export default SingleTodo;
