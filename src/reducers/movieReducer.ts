import { FireDBMovieItem } from '../consts/actionTypes';
import { createSlice } from '@reduxjs/toolkit';
import {
  createMovieAction,
  deleteMovieAction,
  setMoviesAction,
  updateMovieAction,
} from '../actions/moviesActions';

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
