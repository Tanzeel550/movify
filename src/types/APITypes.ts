// ============================================================
// ======================== API Types =========================
// ============================================================

export type SEARCH_TYPE = {
  text: string;
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
