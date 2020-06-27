import Like from "./common/Like/like";
import React, {Component} from "react";
import Table from "./common/table/table";

export class MoviesTable extends Component {
  columns = [
    {path: "title", label: "Title"},
    {path: "genre.name", label: "Genre"},
    {path: "numberInStock", label: "Stock"},
    {path: "dailyRentalRate", label: "Rate"},
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} handleLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const {movies, sortColumn, onSort} = this.props;
    const {columns} = this;
    return (
      <Table
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
