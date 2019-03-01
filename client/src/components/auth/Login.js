import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import Input from "../common/Input";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    formValid: false,
    isEmailValid: false,
    isPasswordValid: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps", nextProps);
    if (nextProps.errors.param === "email") {
      // console.log("I am in ");
      const { msg } = nextProps.errors;
      return { ...prevState, errors: { email: msg } };
    } else if (nextProps.errors.param === "password") {
      const { msg } = nextProps.errors;
      return { ...prevState, errors: { password: msg } };
    }
    return null;
  }

  validateField = (fieldName, value) => {
    const fieldValidationErrors = this.state.errors;
    let { isEmailValid, isPasswordValid } = this.state;
    switch (fieldName) {
      case "password":
        isPasswordValid = value.trim().length > 0;
        fieldValidationErrors.password = isPasswordValid
          ? ""
          : "password is required";

        break;
      case "email":
        // isEmailValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        //   value
        // );
        // fieldValidationErrors.email = isEmailValid ? "" : "email is invalid";
        // break;
        isEmailValid = value.trim().length > 0;
        fieldValidationErrors.email = isEmailValid ? "" : "email is required";
        break;
      default:
        return;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        isEmailValid: isEmailValid,
        isPasswordValid: isPasswordValid
      },
      this.formValidation()
    );
  };
  formValidation = () => {
    const { isEmailValid, isPasswordValid } = this.state;
    this.setState({
      formValid: isEmailValid && isPasswordValid
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
    // try {
    // } catch (error) {
    //   const errors = error.response.data.data[0];
    //   const { param, msg } = errors;
    //   if (param === "password") {
    //     this.setState({ errors: { password: msg } });
    //   } else if (param === "email") {
    //     this.setState({ errors: { email: msg } });
    //   }
    // }
  };

  onChangeHandler = e => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.validateField(e.target.name, e.target.value)
    );
  };
  render() {
    const { email, password, errors, formValid } = this.state;
    return (
      <div className="container">
        <form
          onSubmit={this.onSubmitHandler}
          className="mt-4"
          noValidate
          autoComplete="off"
        >
          <Input
            type="email"
            placeholder="Enter the email"
            name="email"
            value={email}
            onChange={this.onChangeHandler}
            error={errors.email}
          />

          <Input
            type="password"
            placeholder="Enter the password"
            name="password"
            value={password}
            onChange={this.onChangeHandler}
            error={errors.password}
          />
          <button disabled={!formValid} className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
