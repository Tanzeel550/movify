import axios from 'axios';
import fireDB from '../firebase/firebase';
import { GET_MOVIE_BY_TITLE, SEARCH_MOVIE_BY_TEXT } from '../consts/config';
import { MoviesActionParamsType, SEARCH_TYPE } from '../consts/actionTypes';
import {
  createMovie,
  deleteMovie,
  setMovies,
  updateMovie,
} from '../reducers/movieReducer';

export const startCreateMovie = ({ movie }: MoviesActionParamsType) => async (
  dispatch: Function,
  getState: Function
): Promise<void> => {
  try {
    const { uid } = getState().auth.user;
    const ref = await fireDB.ref(`users/${uid}/movies`).push(movie);
    dispatch(
      createMovie({
        movie: {
          id: ref.key!,
          createdAt: movie?.createdAt!,
          dateWatched: movie?.dateWatched!,
          name: movie?.name!,
          watched: movie?.watched!,
          whatYouLearnt: movie?.whatYouLearnt!,
          Poster: movie?.Poster!,
        },
      })
    );
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startGetAllMovies = () => async (
  dispatch: Function,
  getState: Function
): Promise<void> => {
  try {
    const { uid } = getState().auth.user;
    const snapshot = await fireDB.ref(`users/${uid}/movies`).once('value');
    const movies: any[] = [];
    snapshot.forEach(childSnapshot => {
      movies.push({
        ...childSnapshot.val(),
        id: childSnapshot.key,
      });
    });
    movies.sort((a, b) => b.createdAt - a.createdAt);
    dispatch(setMovies({ movies }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startUpdateMovie = ({
  id,
  movie,
}: MoviesActionParamsType) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).update({ ...movie });
    dispatch(updateMovie({ id: id!, movie: movie! }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startDeleteMovie = ({ id }: MoviesActionParamsType) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).remove();
    dispatch(deleteMovie({ id: id! }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
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