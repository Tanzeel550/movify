const OMBD_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
export const SEARCH_MOVIE_BY_TEXT = `https://www.omdbapi.com/?apikey=${OMBD_API_KEY}&s=`;
export const GET_MOVIE_BY_TITLE = `https://www.omdbapi.com/?apikey=${OMBD_API_KEY}&t=`;
export const GET_MOVIE_BY_IMDB_ID = `https://www.omdbapi.com/?apikey=${OMBD_API_KEY}&i=`;

export const PROMISE_AREAS = {
  SEARCH_MOVIE_BY_TEXT: 'SEARCH_MOVIE_BY_TEXT',
  GET_MOVIE_BY_TITLE: 'GET_MOVIE_BY_TITLE',
  GET_ALL_MOVIES: 'GET_ALL_MOVIES',
  LOAD_PAGE: 'LOAD_PAGE',
};

export const skills1 = [
  'Web Design',
  'JavaScript Developer',
  'React JS',
  'Rest API',
  'NodeJS',
];

export const skills2 = ['Company', 'Team', 'Careers'];

export const TEST_MOVIES_SRC = 'movies_test';
