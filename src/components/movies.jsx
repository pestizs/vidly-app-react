import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres, deleteGenre } from "../services/genreService";
import Pagination from "./common/pagination";
import GenresTable from "./genresTable";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import SearchBox from "./SearchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    //we initialize these empty arrays because it takes time till
    //we get the data from the server in componentDidMount
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  //Lifecycle method - Fetch genres and movies
  //and movies data from fake services when the component mounts
  async componentDidMount() {
    const { data } = await getGenres();
    //we put and extra genre to the begining of the array
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }
  // Handle movie deletion
  handleDeleteMovie = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been declared.");

      this.setState({ movies: originalMovies });
    }
  };

  handleDeleteGenre = async (genre) => {
    const originalGenres = this.state.genres;
    const genres = originalGenres.filter((g) => g._id !== genre._id);
    this.setState({ genres });

    try {
      await deleteGenre(genre._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This genre has already been declared.");

      this.setState({ genres: originalGenres });
    }
  };

  // Handle movie like
  handleLike = (movie) => {
    // Create a copy of the movies array from the current state
    const movies = [...this.state.movies];
    // Find the index of the movie to be liked or unliked
    const index = movies.indexOf(movie);
    // Create a copy of the movie object at the found index
    movies[index] = { ...movies[index] };
    // Toggle the 'liked' property of the copied movie
    // If it was true, it becomes false, and vice versa.
    movies[index].liked = !movies[index].liked;
    // Update the state with the modified movies array
    this.setState({ movies });
  };
  // Handle page change
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  // Handle genre selection
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  // Handle movie sorting
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies,
      searchQuery,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    // Filter movies based on selected genre
    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    // Sort filtered movies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // Paginate sorted movies (paginate function in a different module)
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  // Render movies table
  renderMoviesTable() {
    //object destructuring
    const { movies, searchQuery, currentPage, pageSize, sortColumn } =
      this.state;

    // Render movies table
    if (movies.length === 0) return <p>There are no movies in the DB.</p>;

    const { totalCount, data: paginatedMovies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <Link
            to="/genres/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Genre
          </Link>
          <GenresTable
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            onDelete={this.handleDeleteGenre}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>
            Showing <strong>{totalCount}</strong> movies in the DB.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            paginatedMovies={paginatedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
  // Render method
  render() {
    return <>{this.renderMoviesTable()}</>;
  }
}
// Exporting the Movies Component
export default Movies;
