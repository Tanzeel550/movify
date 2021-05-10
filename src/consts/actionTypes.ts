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
  movie?: object;
  movies?: object;
  id?: string;
};

export type MoviesActionParamsType = {
  id?: string;
  movie?: object;
  movies?: object;
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
