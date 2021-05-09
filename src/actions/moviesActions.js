import axios from 'axios';
import fireDB from '../firebase/firebase';
import { GET_MOVIE_BY_TITLE, SEARCH_MOVIE_BY_TEXT } from '../config';

const createMovie = ({ movie }) => ({
  type: 'CREATE_MOVIE',
  movie,
});

export const updateMovie = ({ id, data }) => ({
  type: 'UPDATE_MOVIE',
  data,
  id,
});

const deleteMovie = ({ id }) => ({
  type: 'DELETE_MOVIE',
  id,
});

const getMovies = ({ movies }) => ({
  type: 'GET_MOVIES',
  movies,
});

export const startCreateMovie = ({ data }) => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth.user;
    const ref = await fireDB.ref(`users/${uid}/movies`).push(data);
    dispatch(
      createMovie({
        movie: {
          id: ref.key,
          ...data,
        },
      })
    );
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startGetAllMovies = () => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth.user;
    const snapshot = await fireDB.ref(`users/${uid}/movies`).once('value');
    const movies = [];
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

export const startUpdateMovie = ({ id, ...rest }) => async (
  dispatch,
  getState
) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).update({ ...rest });
    dispatch(updateMovie({ id, data: rest }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startDeleteMovie = id => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth.user;
    await fireDB.ref(`users/${uid}/movies/${id}`).remove();
    dispatch(deleteMovie({ id }));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const searchMovieByText = async text =>
  new Promise(resolve =>
    axios
      .get(SEARCH_MOVIE_BY_TEXT + text)
      .then(({ data }) => {
        if (data.response === 'False') throw new Error('Too many results');
        resolve(data.Search);
      })
      .catch()
  );

export const getMovieByTitle = title =>
  new Promise(resolve =>
    axios
      .get(GET_MOVIE_BY_TITLE + title)
      .then(({ data }) => resolve(data))
      .catch()
  );
