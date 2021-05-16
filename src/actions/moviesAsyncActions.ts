import axios from 'axios';
import fireDB from '../firebase/firebase';
import { GET_MOVIE_BY_TITLE, SEARCH_MOVIE_BY_TEXT } from '../consts/config';
import {
  createMovie,
  deleteMovie,
  setMovies,
  updateMovie,
} from '../reducers/movieReducer';
import {
  CreateMovieType,
  DeleteMovieType,
  UpdateMovieType,
} from '../types/MoviesTypes';
import { SEARCH_TYPE } from '../types/APITypes';
import { DataSnapshot } from '../types/FireBaseTypes';

export const startCreateMovie = (
  { movie }: CreateMovieType,
  path: string = 'movies'
) => async (dispatch: Function, getState: Function): Promise<object> => {
  try {
    const { uid } = getState().auth.user;
    const ref = await fireDB.ref(`${path}/${uid}/movies`).push(movie);
    return dispatch(
      createMovie({
        movie: {
          id: ref.key!,
          createdAt: movie?.createdAt!,
          dateWatched: movie?.dateWatched!,
          name: movie?.name!,
          watched: movie?.watched!,
          whatYouLearnt: movie?.whatYouLearnt!,
          Poster: movie?.Poster!,
          updatedAt: movie?.updatedAt,
        },
      })
    );
  } catch (e) {
    console.log(e.message);
    console.error(e);
    return {};
  }
};

export const startGetAllMovies = (path: string = 'movies') => async (
  dispatch: Function,
  getState: Function
): Promise<object> => {
  try {
    const { uid } = getState().auth.user;
    const snapshot = await fireDB.ref(`${path}/${uid}/movies`).once('value');
    const movies: any[] = [];
    snapshot.forEach((childSnapshot: DataSnapshot) => {
      movies.push({
        ...childSnapshot.val(),
        id: childSnapshot.key,
      });
    });
    movies.sort((a, b) => b.createdAt - a.createdAt);
    return dispatch(setMovies({ movies }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
    return {};
  }
};

export const startUpdateMovie = (
  { id, movie }: UpdateMovieType,
  path: string = 'movies'
) => async (dispatch: Function, getState: Function): Promise<object> => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`${path}/${uid}/movies/${id}`).update({ ...movie });
    return dispatch(updateMovie({ id: id!, movie: movie! }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
    return {};
  }
};

export const startDeleteMovie = (
  { id }: DeleteMovieType,
  path: string = 'movies'
) => async (dispatch: Function, getState: Function): Promise<object> => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`${path}/${uid}/movies/${id}`).remove();
    return dispatch(deleteMovie({ id: id! }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
    return {};
  }
};

export const searchMovieByText = async ({ text }: SEARCH_TYPE) =>
  new Promise(resolve =>
    axios
      .get(SEARCH_MOVIE_BY_TEXT + text)
      .then(({ data }) => {
        if (data.response === 'False') throw new Error('Too many results');
        resolve(data.Search);
      })
      .catch()
  );

export const getMovieByTitle = ({ text }: SEARCH_TYPE) =>
  new Promise(resolve =>
    axios
      .get(GET_MOVIE_BY_TITLE + text)
      .then(({ data }) => resolve(data))
      .catch()
  );
