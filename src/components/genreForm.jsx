import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveGenre } from "../services/genreService";

class GenreForm extends Form {
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string(),
  };

  doSubmit = async () => {
    try {
      await saveGenre(this.state.data);
      this.props.history.push("/genres");
    } catch (error) {
      console.error("Error saving genre:", error.response);
      throw error;
    }
  };

  render() {
    return (
      <div>
        <h1>Genre Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Genre Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default GenreForm;
