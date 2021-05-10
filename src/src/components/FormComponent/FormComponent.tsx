import React from 'react';

import {
  getMovieByTitle,
  searchMovieByText,
} from '../../actions/moviesActions';
import WatchedComponent from './WatchedComponents';
import SearchComponent from './SearchComponent';
import PromiseLoading from '../Utils/PromiseLoading';
import MovieDetails from './MovieDetails';
import { trackPromise } from 'react-promise-tracker';
import { PROMISE_AREAS } from '../../config';

class FormComponent extends React.Component {
	public todayDate: any;
	public state: any;
	public props: any;
	public setState: any;
	public name: any;
	public watched: any;
	public dateWatched: any;
	public whatYouLearnt: any;
	public Poster: any;
	public createdAt: any;
	public updatedAt: any;

  constructor(props) {
    super(props);

    this.todayDate = this.formatDate(Date.now());
    this.state = {
      name: this.props.movie?.name || '',
      watched: this.props.movie?.watched || true,
      dateWatched: this.props.movie?.dateWatched || this.todayDate,
      whatYouLearnt: this.props.movie?.whatYouLearnt || '',
      Poster: this.props.movie?.Poster || '',
      createdAt: this.props.movie?.createdAt || Date.now(),
      updatedAt: Date.now(),

      searchedMovies: null,
      selectedMovie: null,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleWatchedChange = this.handleWatchedChange.bind(this);
  }

  async componentDidMount() {
    document
      .getElementById('dateWatched')
      .setAttribute('max', this.formatDate(new Date()));
    if (this.props.movie) {
      const selectedMovie = await trackPromise(
        getMovieByTitle(this.props.movie.name),
        PROMISE_AREAS.GET_MOVIE_BY_TITLE
      );
      this.setState({ selectedMovie });
    }
  }

  handleSearchItemClick = async e => {
    const itemClicked = e.target.closest('.search--item');
    this.setState({ selectedMovie: null });
    const selectedMovie = await trackPromise(
      getMovieByTitle(itemClicked.dataset.movieName),
      PROMISE_AREAS.GET_MOVIE_BY_TITLE
    );
    this.setState({
      searchedMovies: [],
      name: selectedMovie.Title,
      Poster: selectedMovie.Poster,
      selectedMovie,
    });
  };

  formatDate = date => {
    const dateObj = new Date(date);
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const mm = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${yyyy}-${mm}-${day}`;
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      name,
      watched,
      dateWatched,
      whatYouLearnt,
      Poster,
      createdAt,
      updatedAt,
    } = this.state;
    const movie = {
      name,
      watched,
      dateWatched,
      whatYouLearnt,
      Poster,
      createdAt,
      updatedAt,
    };

    this.props.handleFormSubmit(movie);
  };

  handleNameChange = async e => {
    await this.setState({ name: e.target.value });

    this.setState({ searchedMovies: [] });
    const searchedMovies = await trackPromise(
      searchMovieByText(this.state.name),
      PROMISE_AREAS.SEARCH_MOVIE_BY_TEXT
    );
    if (!searchedMovies) return;

    this.setState({ searchedMovies: searchedMovies.slice(0, 5) });
  };

  handleTextChange = e => this.setState({ whatYouLearnt: e.target.value });
  handleDateChange = e =>
    this.setState({ dateWatched: this.formatDate(e.target.value) });
  handleWatchedChange = e => this.setState({ watched: e.target.checked });

  render() {
    return (
      <div className="container">
        <div className="row movie__form">
          <div className="col-4">
            <img src={this.state.Poster} alt="" />
          </div>
          <div className="col-8">
            <form className="row">
              <div className="col-sm-12 row">
                <div className="col-sm-10 movie__form--label-name">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>
                <div className="col-sm-2">
                  <label htmlFor="isWatched">Watched</label>
                  <input
                    type="checkbox"
                    id="isWatched"
                    className="form-check"
                    value={this.state.watched}
                    defaultChecked={true}
                    onChange={this.handleWatchedChange}
                  />
                </div>
              </div>
              {this.state.watched && (
                <WatchedComponent
                  handleTextChange={this.handleTextChange}
                  handleDateChange={this.handleDateChange}
                  state={this.state}
                />
              )}
              {this.props.actionType === 'add' && (
                <div
                  className="col-sm-12 d-flex justify-content-center"
                  onClick={this.handleFormSubmit}
                >
                  <button className="btn btn-primary btn-lg mt-3">
                    Create
                  </button>
                </div>
              )}
              {this.props.actionType === 'update' && (
                <div className="col-sm-12 d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg mt-3"
                    onClick={this.handleFormSubmit}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-lg mt-3"
                    onClick={this.props.handleMovieDeletion}
                  >
                    Remove
                  </button>
                </div>
              )}
              {this.state.searchedMovies?.length > 0 && (
                <div>
                  <PromiseLoading area={PROMISE_AREAS.SEARCH_MOVIE_BY_TEXT} />
                  <SearchComponent
                    handleSearchItemClick={this.handleSearchItemClick}
                    movies={this.state.searchedMovies}
                  />
                </div>
              )}
            </form>
          </div>
          <div>
            <PromiseLoading area={PROMISE_AREAS.GET_MOVIE_BY_TITLE} />
            {this.state.selectedMovie && (
              <MovieDetails movie={this.state.selectedMovie} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FormComponent;
