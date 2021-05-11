import React from 'react';

import {
  getMovieByTitle,
  searchMovieByText,
} from '../../actions/moviesAsyncActions';
import WatchedComponent from './WatchedComponents';
import SearchComponent from './SearchComponent';
import PromiseLoading from '../Utils/PromiseLoading';
import MovieDetails from './MovieDetails';
import { trackPromise } from 'react-promise-tracker';
import { PROMISE_AREAS } from '../../consts/config';
import {
  APIMovieResultByTitle,
  APIMovieResultsBySearch,
  FireDBMovieItem,
} from '../../consts/actionTypes';

type Props = {
  movie?: FireDBMovieItem;
  actionType: 'update' | 'add';
  handleFormSubmit: (data: FireDBMovieItem) => {};
  handleMovieDeletion?: () => {};
};

type State = {
  todayDate: string;

  name: string;
  watched: boolean;
  dateWatched: number;
  whatYouLearnt: string;
  Poster: string;
  createdAt: number;
  updatedAt: number;

  selectedMovie: any;
  searchedMovies: any;
};

class MovieForm extends React.Component<Props, State> {
  state: State = {
    todayDate: this.formatDate(Date.now()),
    name: this.props.movie?.name || '',
    watched: this.props.movie?.watched || true,
    dateWatched: this.props.movie?.dateWatched || this.state.todayDate,
    whatYouLearnt: this.props.movie?.whatYouLearnt || '',
    Poster: this.props.movie?.Poster || '',
    createdAt: this.props.movie?.createdAt || Date.now(),
    updatedAt: Date.now(),

    searchedMovies: null,
    selectedMovie: null,
  };

  async componentDidMount() {
    document
      .getElementById('dateWatched')!
      .setAttribute('max', this.formatDate(new Date()));
    if (this.props.movie) {
      const selectedMovie = await trackPromise(
        getMovieByTitle({ text: this.state.name }),
        PROMISE_AREAS.GET_MOVIE_BY_TITLE
      );
      this.setState({ selectedMovie });
    }
  }

  async handleSearchItemClick(title: string): Promise<void> {
    this.setState({ selectedMovie: null });
    // @ts-ignore
    const selectedMovie: APIMovieResultByTitle = await trackPromise(
      getMovieByTitle({ text: title }),
      PROMISE_AREAS.GET_MOVIE_BY_TITLE
    );

    this.setState({
      searchedMovies: [],
      name: selectedMovie.Title!,
      Poster: selectedMovie.Poster!,
      selectedMovie,
    });
  }

  formatDate(date: any): string {
    const dateObj = new Date(date);
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const mm = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${yyyy}-${mm}-${day}`;
  }

  handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const movie = {
      name: this.state.name,
      watched: this.state.watched,
      dateWatched: this.state.dateWatched,
      whatYouLearnt: this.state.whatYouLearnt,
      Poster: this.state.Poster,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
    this.props.handleFormSubmit(movie);
  }

  async handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    await this.setState({ name: e.target.value });

    this.setState({ searchedMovies: [] });
    // @ts-ignore
    const searchedMovies: APIMovieResultsBySearch = await trackPromise(
      searchMovieByText({ text: this.state.name }),
      PROMISE_AREAS.SEARCH_MOVIE_BY_TEXT
    );
    if (!searchedMovies) return;

    this.setState({ searchedMovies: searchedMovies.slice(0, 5) });
  }

  handleDateChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ dateWatched: +this.formatDate(e.target.value) });
  }

  handleWatchedChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ watched: e.target.checked });
  }

  handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ whatYouLearnt: e.target.value });
  }

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
                    value={`${this.state.watched}`}
                    defaultChecked={true}
                    onChange={this.handleWatchedChange}
                  />
                </div>
              </div>
              {this.state.watched && (
                <WatchedComponent
                  handleTextChange={this.handleTextAreaChange}
                  handleDateChange={this.handleDateChange}
                  movie={{
                    dateWatched: this.state.dateWatched,
                    whatYouLearnt: this.state.whatYouLearnt,
                  }}
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

export default MovieForm;
