import Like from "./common/Like/like";
import React, {Component} from "react";
import TableHeader from "./common/tableHeader/tableHeader";

export class MoviesTable extends Component {
  columns = [
    {path: "title", label: "Title"},
    {path: "genre.name", label: "Genre"},
    {path: "numberInStock", label: "Stock"},
    {path: "dailyRentalRate", label: "Rate"},
    {key: "like"},
    {key: "delete"},
  ];
  render() {
    const {movies, onDelete, onLike, sortColumn, onSort} = this.props;
    const {columns} = this;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} handleLike={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
