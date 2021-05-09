import axios from 'axios';
import thorDatabase from '../firebase/firebase';
import { GET_MOVIE_BY_TITLE, SEARCH_MOVIE_BY_TEXT } from '../config';
import configStore from '../store/configStore';

const createMovie = movie => ({
  type: 'CREATE_MOVIE',
  movie,
});

export const updateMovie = (id, data) => ({
  type: 'UPDATE_MOVIE',
  data,
  id,
});

const deleteMovie = id => ({
  type: 'DELETE_MOVIE',
  id,
});

const getMovies = movies => ({
  type: 'GET_MOVIES',
  movies,
});

export const startCreateMovie = data => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth.user;
    const ref = await thorDatabase.ref(`users/${uid}/movies`).push(data);
    dispatch(
      createMovie({
        id: ref.key,
        ...data,
      })
    );
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startGetAllMovies = () => (dispatch, getState) =>
  new Promise(resolve => {
    const { uid } = getState().auth.user;
    thorDatabase
      .ref(`users/${uid}/movies`)
      .once('value')
      .then(snapshot => {
        const movies = [];
        snapshot.forEach(childSnapshot => {
          movies.push({
            ...childSnapshot.val(),
            id: childSnapshot.key,
          });
        });
        movies.sort((a, b) => b.createdAt - a.createdAt);
        return configStore.dispatch(getMovies(movies));
      })
      .then(resolve)
      .catch();
  });

export const startUpdateMovie = ({ id, ...rest }) => async (
  dispatch,
  getState
) => {
  try {
    const { uid } = getState().auth.user;
    await thorDatabase.ref(`users/${uid}/movies/${id}`).update({ ...rest });
    dispatch(updateMovie(id, rest));
  } catch (e) {
    console.log(e.message);
    console.error(e);
  }
};

export const startDeleteMovie = id => async (dispatch, getState) => {
  const { uid } = getState().auth.user;
  thorDatabase
    .ref(`users/${uid}/movies/${id}`)
    .remove()
    .then(() => dispatch(deleteMovie(id)))
    .catch(e => {
      console.log(e.message);
      console.error(e);
    });
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
