export type EmailPassType = {
  email: string;
  password: string;
};

export type AuthActionsType = {
  type: 'LOGIN' | 'LOGOUT';
  user?: object;
};

export type AuthUserType = {
  user: object;
};

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

export type SEARCH_TYPE = {
  text: string;
};

export type ErrorType = {
  message: string;
  title: string;
};

export type ErrorActionsReturnType = {
  type: 'SET_ERROR' | 'CLEAR_ERROR';
  message?: string;
  title?: string;
};

export type APISingleMovieResultBySearch = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type APIMovieResultsBySearch = APISingleMovieResultBySearch[];

export type Rating = {
  Source: string;
  Value: string;
};

export type APIMovieResultByTitle = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
};

export type FireDBMovieItem = {
  id?: string;
  name: string;
  watched: boolean;
  dateWatched: any;
  whatYouLearnt: string;
  Poster: string;
  createdAt: number;
};
