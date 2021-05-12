import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FireDBMovieItem } from '../types/APITypes';
import {
  CreateMovieType,
  DeleteMovieType,
  SetMovieType,
  UpdateMovieType,
} from '../types/MoviesTypes';

const createMovieAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<CreateMovieType>
> = (state, action) => {
  return [...state, action.payload.movie];
};

const setMoviesAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<SetMovieType>
> = (state, action) => {
  return action.payload.movies;
};

const updateMovieAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<UpdateMovieType>
> = (state, action) => {
  return state.map(movie =>
    movie.id === action.payload.id
      ? {
          ...action.payload.movie,
          id: action.payload.id,
        }
      : movie
  );
};

const deleteMovieAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<DeleteMovieType>
> = (state, action) => {
  return state.filter(movie => movie.id !== action.payload.id);
};

const MovieReducer = createSlice({
  name: 'Movie',
  initialState: [] as FireDBMovieItem[],
  reducers: {
    createMovie: createMovieAction,
    setMovies: setMoviesAction,
    updateMovie: updateMovieAction,
    deleteMovie: deleteMovieAction,
  },
});

export const {
  createMovie,
  setMovies,
  updateMovie,
  deleteMovie,
} = MovieReducer.actions;
export default MovieReducer.reducer;
