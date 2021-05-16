// ============================================================
// ======================= Movies Types =======================
// ============================================================

import { FireDBMovieItem } from './APITypes';

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

export type UploadedMoviesType = {
  [id: string]: FireDBMovieItem;
};
