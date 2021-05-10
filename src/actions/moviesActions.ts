import axios from 'axios';
import fireDB from '../firebase/firebase';
import { GET_MOVIE_BY_TITLE, SEARCH_MOVIE_BY_TEXT } from '../consts/config';
import { MOVIE_ID, MOVIES_ACTION, SEARCH_TYPE } from '../consts/typesConfig';

const createMovie = ({ movie }: MOVIE_ID): MOVIES_ACTION => ({
  type: 'CREATE_MOVIE',
  movie,
});

export const updateMovie = ({ id, movie }: MOVIE_ID): MOVIES_ACTION => ({
  type: 'UPDATE_MOVIE',
  movie,
  id,
});

const deleteMovie = ({ id }: MOVIE_ID): MOVIES_ACTION => ({
  type: 'DELETE_MOVIE',
  id,
});

const getMovies = ({ movies }: MOVIE_ID): MOVIES_ACTION => ({
  type: 'GET_MOVIES',
  movies,
});

export const startCreateMovie = ({ movie }: MOVIE_ID) => async (
  dispatch: Function,
  getState: Function
): Promise<void> => {
  try {
    const { uid } = getState().auth.user;
    const ref = await fireDB.ref(`users/${uid}/movies`).push(movie);
    dispatch(
      createMovie({
        movie: {
          id: ref.key,
          ...movie,
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
    dispatch(getMovies({ movies }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startUpdateMovie = ({ id, ...movie }: MOVIE_ID) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).update({ ...movie });
    dispatch(updateMovie({ id, movie }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startDeleteMovie = ({ id }: MOVIE_ID) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).remove();
    dispatch(deleteMovie({ id }));
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
