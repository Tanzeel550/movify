import { FireDBMovieItem } from '../consts/actionTypes';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type CreateMovieType = {
  movie: FireDBMovieItem;
};

export const createMovieAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<CreateMovieType>
> = (state, action) => {
  return [...state, action.payload.movie];
};

type SetMovieType = {
  movies: FireDBMovieItem[];
};

export const setMoviesAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<SetMovieType>
> = (state, action) => {
  return action.payload.movies;
};

type UpdateMovieType = {
  id: string;
  movie: FireDBMovieItem;
};

export const updateMovieAction: CaseReducer<
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

export const deleteMovieAction: CaseReducer<
  FireDBMovieItem[],
  PayloadAction<DeleteMovieType>
> = (state, action) => {
  return state.filter(movie => movie.id !== action.payload.id);
};

type DeleteMovieType = {
  id: string;
};
