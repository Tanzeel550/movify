import { FireDBMovieItem, MoviesActionReturnType } from '../consts/actionTypes';

const defaultState: any = [];

type actionType = MoviesActionReturnType;

const movieReducer = (
  state: FireDBMovieItem[] = defaultState,
  action: actionType
) => {
  switch (action.type) {
    case 'CREATE_MOVIE':
      return [...state, action.movie];
    case 'GET_MOVIES':
      return action.movies;
    case 'UPDATE_MOVIE':
      return state.map(movie =>
        movie.id === action.id
          ? {
              ...action.movie,
              id: action.id,
            }
          : movie
      );
    case 'DELETE_MOVIE':
      return state.filter(movie => movie.id !== action.id);
    default:
      return state;
  }
};

export default movieReducer;
