import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startCreateMovie,
  startDeleteMovie,
  startGetAllMovies,
  startUpdateMovie,
} from '../../actions/moviesAsyncActions';
import { movies, users } from '../../consts/fixtures';
import fireDB from './../../firebase/firebase';
import { TEST_MOVIES_SRC } from '../../consts/config';
import { FireDBMovieItem } from '../../types/APITypes';
import { UploadedMoviesType } from '../../types/MoviesTypes';
import { DataSnapshot } from '../../types/FireBaseTypes';

const configStore = createMockStore([thunk]);

type PayloadType = {
  payload: { movie?: FireDBMovieItem; movies?: FireDBMovieItem[] };
};

jest.setTimeout(20000); // 20000 ms -> 20s

let moviesToBeUploaded: UploadedMoviesType = {};

beforeEach(done => {
  // prettier-ignore
  movies.forEach(({ id, name, createdAt, updatedAt, Poster, whatYouLearnt, watched, dateWatched }) => {
      moviesToBeUploaded[id!] = { name, createdAt, updatedAt, Poster, whatYouLearnt, watched, dateWatched };
    }
  );

  fireDB
    .ref(`${TEST_MOVIES_SRC}/${users[0].uid}/movies`)
    .set(moviesToBeUploaded)
    .then(done);
});

test('should create movie in the database', done => {
  const initialState = {
    movies: [],
    auth: { user: users[0] },
  };
  const store = configStore(initialState);
  store
    // @ts-ignore
    .dispatch(startCreateMovie({ movie: movies[0] }, TEST_MOVIES_SRC))
    .then(({ payload }: PayloadType) => {
      let moviesFromDB: FireDBMovieItem;
      fireDB
        .ref(`${TEST_MOVIES_SRC}/${users[0].uid}/movies/${payload.movie!.id}`)
        .once('value')
        .then((snapshot: DataSnapshot) => {
          moviesFromDB = {
            ...snapshot.val(),
            id: snapshot.key,
          };
          expect(moviesFromDB).toStrictEqual(payload.movie);
          expect(store.getActions()[0].payload.movie).toStrictEqual(
            moviesFromDB
          );
          done();
        });
    });
});

test('should get movies from the database', done => {
  const initialState = {
    movies: [],
    auth: { user: users[0] },
  };
  const store = configStore(initialState);
  store
    // @ts-ignore
    .dispatch(startGetAllMovies(TEST_MOVIES_SRC))
    .then(({ payload }: PayloadType) => {
      const expectedMovies = [...movies].sort(
        // @ts-ignore
        (a, b) => b.createdAt - a.createdAt
      );
      expect(payload.movies).toStrictEqual(expectedMovies);
      expect(store.getActions()[0].payload.movies).toStrictEqual(
        expectedMovies
      );
      done();
    });
});

test('should update movie with the given id', done => {
  const initialState = {
    movies,
    auth: { user: users[0] },
  };
  const updatedMovie = {
    ...movies[0],
    whatYouLearnt: 'Avatar - The Last AirBender',
  };
  const store = configStore(initialState);
  store
    .dispatch(
      // @ts-ignore
      startUpdateMovie(
        { id: updatedMovie.id!, movie: updatedMovie },
        TEST_MOVIES_SRC
      )
    )
    .then(({ payload }: PayloadType) => {
      expect(payload.movie).toStrictEqual(updatedMovie);

      return fireDB
        .ref(`${TEST_MOVIES_SRC}/${users[0].uid}/movies/${payload.movie?.id}`)
        .once('value');
    })
    .then((snapshot: DataSnapshot) => {
      const expectedMovie = {
        ...snapshot.val(),
        id: snapshot.key,
      };
      expect(expectedMovie).toStrictEqual(updatedMovie);
      done();
    });
});

test('should delete movie with the given id', done => {
  const initialState = {
    movies,
    auth: { user: users[0] },
  };
  const store = configStore(initialState);
  const id = movies[0].id!;
  store
    // @ts-ignore
    .dispatch(startDeleteMovie({ id }, TEST_MOVIES_SRC))
    .then(() => {
      return fireDB
        .ref(`${TEST_MOVIES_SRC}/${users[0].uid}/movies`)
        .once('value');
    })
    .then((snapshot: DataSnapshot) => {
      const expectedMovies: any[] = [];
      snapshot.forEach((childSnapshot: DataSnapshot) => {
        expectedMovies.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
        });
      });
      expect(expectedMovies).toStrictEqual([movies[1], movies[2]]);
      done();
    });
});

export {};
