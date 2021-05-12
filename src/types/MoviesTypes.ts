// ============================================================
// ======================= Movies Types =======================
// ============================================================

import { FireDBMovieItem } from './APITypes';

export type MoviesActionReturnType = {
  type: 'CREATE_MOVIE' | 'GET_MOVIES' | 'UPDATE_MOVIE' | 'DELETE_MOVIE';
  movie?: FireDBMovieItem;
  movies?: FireDBMovieItem[];
  id?: string;
};

export type MoviesActionParamsType = {
  id?: string;
  movie?: FireDBMovieItem;
  movies?: FireDBMovieItem[];
};

export type CreateMovieType = {
  movie: FireDBMovieItem;
};

export type SetMovieType = {
  movies: FireDBMovieItem[];
};

export type UpdateMovieType = {
  id: string;
  movie: FireDBMovieItem;
};

export type DeleteMovieType = {
  id: string;
};
