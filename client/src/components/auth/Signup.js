import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";
import Input from "../common/Input";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {},
    formValid: false,
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps", nextProps);
    if (nextProps.errors.param === "email") {
      // console.log("I am in ");
      const { msg } = nextProps.errors;
      return { ...prevState, errors: { email: msg } };
    }
    return null;
  }

  //form validation
  validateField = (fieldName, value) => {
    // console.log("Validation");
    // console.log(this.state);
    const fieldValidationErrors = this.state.errors;
    let { isNameValid, isEmailValid, isPasswordValid } = this.state;
    switch (fieldName) {
      case "name":
        isNameValid = value.trim().length >= 3;
        fieldValidationErrors.name = isNameValid
          ? ""
          : "name should be at least 3 char";
        break;
      case "password":
        isPasswordValid = value.trim().length >= 6;
        fieldValidationErrors.password = isPasswordValid
          ? ""
          : "password should be at least 5 char";

        break;
      case "email":
        isEmailValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        );
        fieldValidationErrors.email = isEmailValid ? "" : "email is invalid";
        break;

      default:
        return;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        isNameValid: isNameValid,
        isEmailValid: isEmailValid,
        isPasswordValid: isPasswordValid
      },
      this.formValidation()
    );
  };
  formValidation = () => {
    const { isNameValid, isEmailValid, isPasswordValid } = this.state;
    this.setState({
      formValid: isNameValid && isEmailValid && isPasswordValid
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.formValid) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      this.props.registerUser(user, this.props.history);
    }
  };

  onChangeHandler = e => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.validateField(e.target.name, e.target.value)
    );
  };

  render() {
    const { name, email, password, errors, formValid } = this.state;
    return (
      <div className="container">
        <form
          className="mt-4"
          onSubmit={this.onSubmitHandler}
          noValidate
          autoComplete="off"
        >
          <Input
            name="name"
            placeholder="Enter the name"
            value={name}
            onChange={this.onChangeHandler}
            error={errors.name}
          />
          <Input
            name="email"
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={this.onChangeHandler}
            info="You email in secured"
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={this.onChangeHandler}
            error={errors.password}
          />
          <button disabled={!formValid} className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error
});
export default connect(
  mapStateToProps,
  { registerUser }
)(Signup);
