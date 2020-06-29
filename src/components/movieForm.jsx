import React from "react";
import Joi from "joi-browser";
import Form from "./common/form/form";

export default class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      rate: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genere"),
    numberInStock: Joi.number()
      .max(100)
      .min(0)
      .required()
      .label("Number in Stock"),
    rate: Joi.number().max(100).min(0).required().label("Rate"),
  };

  doSubmit = () => {
    console.log("Register");
  };

  render() {
    return (
      <div>
        <form>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}
