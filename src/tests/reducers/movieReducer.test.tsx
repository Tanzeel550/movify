import MovieReducer, {
  createMovie,
  deleteMovie,
  setMovies,
  updateMovie,
} from '../../reducers/movieReducer';
import {
  CreateMovieType,
  DeleteMovieType,
  SetMovieType,
  UpdateMovieType,
} from '../../types/MoviesTypes';
import { movies } from '../../consts/fixtures';
import { FireDBMovieItem } from '../../types/APITypes';

test('should really screw by creatingMovie', () => {
  const result = MovieReducer([], createMovie({ movie: movies[0] }));
  expect(result).toStrictEqual([movies[0]]);
});

test('should really screw by updatingMovie', () => {
  const newMovie: FireDBMovieItem = {
    ...movies[0],
    name: 'Winter is Coming',
  };
  const result = MovieReducer(
    movies,
    updateMovie({ id: movies[0].id!, movie: newMovie })
  );
  expect(result).toStrictEqual([newMovie, movies[1], movies[2]]);
});

test('should really screw by deletingMovie', () => {
  const result = MovieReducer(movies, deleteMovie({ id: movies[0].id! }));
  expect(result).toStrictEqual([movies[1], movies[2]]);
});

test('should really screw by settingMovie', () => {
  const result = MovieReducer([], setMovies({ movies }));
  expect(result).toStrictEqual(movies);
});

// Message: Following 4 tests are not really important
test('should create Movie', () => {
  const payload: CreateMovieType = { movie: movies[0] };
  expect(createMovie(payload)).toStrictEqual({
    type: 'Movie/createMovie',
    payload,
  });
});

test('should update Movie', () => {
  const payload: UpdateMovieType = {
    id: movies[0].id!,
    movie: {
      ...movies[0],
      name: 'DARK',
    },
  };
  expect(updateMovie(payload)).toStrictEqual({
    type: 'Movie/updateMovie',
    payload,
  });
});

test('should delete Movie', () => {
  const payload: DeleteMovieType = { id: movies[0].id! };
  expect(deleteMovie(payload)).toStrictEqual({
    type: 'Movie/deleteMovie',
    payload,
  });
});

test('should set Movies', () => {
  const payload: SetMovieType = { movies };
  expect(setMovies(payload)).toStrictEqual({
    type: 'Movie/setMovies',
    payload,
  });
});

export {};
