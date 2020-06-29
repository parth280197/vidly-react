import React from "react";
import Joi from "joi-browser";
import Form from "./common/form/form";
import {getGenres} from "../services/fakeGenreService";
import {saveMovie, getMovie} from "../services/fakeMovieService";

export default class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  componentDidMount = () => {
    if (this.props.match.params.id) {
      const movie = getMovie(this.props.match.params.id);
      if (movie) {
        this.setState({data: this.mapRawToModel(movie)});
      } else {
        this.props.history.replace("/not-found");
      }
    }
    const genres = getGenres();
    this.setState({genres});
  };

  mapRawToModel = (movie) => {
    return {
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      title: movie.title,
      _id: movie._id,
    };
  };

  schema = {
    _id: Joi.string().optional().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genere"),
    numberInStock: Joi.number()
      .max(100)
      .min(0)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().max(100).min(0).required().label("Rate"),
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const {genres} = this.state;

    return (
      <div>
        <form>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres, "Please select genre")}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}
