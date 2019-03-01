import React, { Component } from "react";
import { connect } from "react-redux";

import { getTodo, deleteTodo, addTodo } from "../../actions/todoActions";

import SingleTodo from "./SingleTodo";
import Input from "../common/Input";

class Todo extends Component {
  state = {
    todo: ""
  };
  componentDidMount() {
    this.props.getTodo();
  }
  onClickHandler = id => {
    this.props.deleteTodo(id);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddHandler = e => {
    e.preventDefault();
    const todo = {
      content: this.state.todo
    };
    this.props.addTodo(todo);
  };

  render() {
    console.log(this.props.todo);
    const { todo } = this.props.todo;
    // console.log("todo", todo);
    let todoContent;
    if (todo.length > 0) {
      todoContent = (
        <SingleTodo onClickHandler={this.onClickHandler} todo={todo} />
      );
    }
    return (
      <div className="container mt-4">
        <button
          type="button"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#addTodo"
        >
          Add Todo
        </button>
        {/* Modal */}
        <div className="container">
          <div className="modal fade" id="addTodo">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Todo</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form autoComplete="off">
                    <Input
                      placeholder="New Todo"
                      name="todo"
                      value={this.state.todo}
                      onChange={this.onChangeHandler}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={this.onAddHandler}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-2">{todoContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo
});
export default connect(
  mapStateToProps,
  { getTodo, deleteTodo, addTodo }
)(Todo);

/*
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

*/
