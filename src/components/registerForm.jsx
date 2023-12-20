import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "./../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);
      auth.loginWithJWT(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        errors = ex.response.data;
        this.setState({ errors });
        console.log(errors);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderAlert}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
