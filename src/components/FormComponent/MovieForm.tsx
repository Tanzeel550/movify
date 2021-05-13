import React, { useEffect, useState } from 'react';

import {
  getMovieByTitle,
  searchMovieByText,
} from '../../actions/moviesAsyncActions';
import SearchComponent from './SearchComponent';
import PromiseLoading from '../Utils/PromiseLoading';
import MovieDetails from './MovieDetails';
import { trackPromise } from 'react-promise-tracker';
import { PROMISE_AREAS } from '../../consts/config';
import { APIMovieResultByTitle, FireDBMovieItem } from '../../types/APITypes';

type Props = {
  movie?: FireDBMovieItem;
  actionType: 'update' | 'add';
  handleFormSubmit: (data: FireDBMovieItem) => {};
  handleMovieDeletion?: () => {};
};

const MovieForm: React.FC<Props> = ({
  movie,
  actionType,
  handleFormSubmit,
  handleMovieDeletion,
}: Props) => {
  const formatDate = (date: any): string => {
    const dateObj = new Date(date);
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const mm = `${dateObj.getMonth() + 1}`.padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${yyyy}-${mm}-${day}`;
  };

  const [todayDate] = useState(formatDate(Date.now()));
  const [name, setName] = useState(movie?.name || '');
  const [watched, setWatched] = useState(movie?.watched || true);
  const [dateWatched, setDateWatched] = useState(
    movie?.dateWatched || todayDate
  );
  const [whatYouLearnt, setWhatYouLearnt] = useState(
    movie?.whatYouLearnt || ''
  );
  const [Poster, setPoster] = useState(movie?.Poster || '');
  const [createdAt] = useState(movie?.createdAt || Date.now() + '');
  const [updatedAt] = useState(Date.now());

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<
    APIMovieResultByTitle | undefined
  >();

  useEffect(() => {
    (async () => {
      document
        .getElementById('dateWatched')!
        .setAttribute('max', formatDate(new Date()));
      if (movie) {
        const selectedMovie: APIMovieResultByTitle = (await trackPromise(
          getMovieByTitle({ text: name }),
          PROMISE_AREAS.GET_MOVIE_BY_TITLE
        )) as APIMovieResultByTitle;
        setSelectedMovie(selectedMovie);
      }
    })();
  }, [movie, name]);

  const handleSearchItemClick = async (title: string): Promise<void> => {
    setSelectedMovie(undefined);
    const selectedMovie: APIMovieResultByTitle = (await trackPromise(
      getMovieByTitle({ text: title }),
      PROMISE_AREAS.GET_MOVIE_BY_TITLE
    )) as APIMovieResultByTitle;
    setSearchedMovies([]);
    setName(selectedMovie.Title!);
    setPoster(selectedMovie.Poster!);
    setSelectedMovie(selectedMovie);
  };

  const localFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const movie = {
      name: name,
      watched: watched,
      dateWatched: dateWatched,
      whatYouLearnt: whatYouLearnt,
      Poster: Poster,
      createdAt: createdAt + '',
      updatedAt: updatedAt + '',
    };
    handleFormSubmit(movie);
  };

  const handleNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    await setName(e.target.value);
    await setSearchedMovies([]);
    // @ts-ignore
    const searchedMovies: APIMovieResultsBySearch = (await trackPromise(
      searchMovieByText({ text: name }),
      PROMISE_AREAS.SEARCH_MOVIE_BY_TEXT
    )) as APIMovieResultByTitle;
    if (!searchedMovies) return;
    setSearchedMovies(searchedMovies.slice(0, 5));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDateWatched(formatDate(e.target.value));
  };

  const handleWatchedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // @ts-ignore
    setWatched(Boolean(e.target.value));
  };

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setWhatYouLearnt(e.target.value);
  };

  return (
    <div className="container">
      <div className="row movie__form">
        <div className="col-4">
          <img src={Poster} alt="" />
        </div>
        <div className="col-8">
          <form className="row" onSubmit={localFormSubmit}>
            <div className="col-sm-12 row">
              <div className="col-sm-10 movie__form--label-name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="col-sm-2">
                <label htmlFor="isWatched">Watched</label>
                <input
                  type="checkbox"
                  id="isWatched"
                  className="form-check"
                  value={`${watched}`}
                  defaultChecked={true}
                  onChange={handleWatchedChange}
                />
              </div>
            </div>
            {watched && (
              <div className="col-sm-12 row">
                <div className="col-lg-4 col-md-4">
                  <label htmlFor="dateWatched">Date Watched:</label>
                  <input
                    type="date"
                    id="dateWatched"
                    value={dateWatched}
                    onChange={handleDateChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-8 col-md-8" />
                <div className="col-sm-12">
                  <label htmlFor="text-area">What You Learnt from it?</label>
                  <textarea
                    value={whatYouLearnt}
                    onChange={handleTextAreaChange}
                    id="text-area"
                    className="form-control"
                    style={{ height: 285 }}
                  />
                </div>
              </div>
            )}
            {actionType === 'add' && (
              <div
                className="col-sm-12 d-flex justify-content-center"
                onClick={localFormSubmit}
              >
                <button className="btn btn-primary btn-lg mt-3">Create</button>
              </div>
            )}
            {actionType === 'update' && (
              <div className="col-sm-12 d-flex justify-content-center">
                <button
                  className="btn btn-primary btn-lg mt-3"
                  onClick={localFormSubmit}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-lg mt-3"
                  onClick={handleMovieDeletion}
                >
                  Remove
                </button>
              </div>
            )}
            {searchedMovies?.length > 0 && (
              <div>
                <PromiseLoading area={PROMISE_AREAS.SEARCH_MOVIE_BY_TEXT} />
                <SearchComponent
                  handleSearchItemClick={handleSearchItemClick}
                  movies={searchedMovies}
                />
              </div>
            )}
          </form>
        </div>
        <div>
          <PromiseLoading area={PROMISE_AREAS.GET_MOVIE_BY_TITLE} />
          {selectedMovie && <MovieDetails movie={selectedMovie} />}
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
