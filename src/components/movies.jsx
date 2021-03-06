import React, {Component} from "react";
import {getMovies, deleteMovie} from "../services/fakeMovieService";
import Pagination from "./common/pagination/pagination";
import {paginate} from "./../utils/paginate";
import ListGroup from "./common/listGroup/listGroup";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import {Link} from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    query: "",
    sortColumn: {path: "title", order: "asc"},
  };

  componentDidMount = () => {
    const genres = [{_id: "", name: "All Genres"}, ...getGenres()];
    this.setState({genres: genres, movies: getMovies()});
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movie};
    movies[index].liked = !movie.liked;
    this.setState({movies});
  };

  handleSearch = (query) => {
    this.setState({query, currentPage: 1, selectedGenre: null});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  };

  handleGenre = (genre) => {
    this.setState({selectedGenre: genre, currentPage: 1});
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      query,
    } = this.state;

    let filteredMovies;

    if (query) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return {totalCount: filteredMovies.length, data: movies};
  };

  render() {
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, genres, sortColumn} = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const {totalCount, data: movies} = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenre}
          />
        </div>
        <div className="col">
          <div className="row mb-2">
            <SearchBox
              placeholder="Search movie..."
              onChange={this.handleSearch}
              value={this.state.query}
            />
          </div>
          <div className="row mb-1">
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          </div>
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
