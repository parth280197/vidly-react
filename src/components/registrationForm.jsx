import React from "react";
import Joi from "joi-browser";
import Form from "./common/form/form";

export default class RegistrationForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      data: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Register");
  };

  render() {
    return (
      <div>
        <form>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmit("Register")}
        </form>
      </div>
    );
  }
}
