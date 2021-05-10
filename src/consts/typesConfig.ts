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

export type MOVIES_ACTION = {
  type: 'CREATE_MOVIE' | 'GET_MOVIES' | 'UPDATE_MOVIE' | 'DELETE_MOVIE';
  movie?: object;
  movies?: object;
  id?: string;
};

export type SEARCH_TYPE = {
  text: string;
};

export type MOVIE_ID = {
  id?: string;
  movie?: object;
  movies?: object;
};
