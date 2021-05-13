import { shallow, ShallowWrapper } from 'enzyme';
import MovieForm from '../../../components/FormComponent/MovieForm';
import React from 'react';
import { movies, nameOfTheMovie } from '../../../consts/fixtures';
import { FireDBMovieItem } from '../../../types/APITypes';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  actionType: 'update' | 'add',
  handleFormSubmit: jest.Mock<any, any>,
  handleMovieDeletion: jest.Mock<any, any>;

beforeEach(() => {
  actionType = 'add';
  handleFormSubmit = jest.fn();
  wrapper = shallow(
    <MovieForm actionType={actionType} handleFormSubmit={handleFormSubmit} />
  );
});

test('should render MovieForm correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

const fuck = ({
  at,
  value,
  expected,
}: {
  at: number;
  value: any;
  expected: any;
}) => {
  wrapper.find('input').at(at).simulate('change', { target: { value } });
  expect(wrapper.find('input').at(at).prop('value')).toBe(expected);
};

test('should change name when nameOfTheMovie by the user', () => {
  fuck({ at: 0, value: nameOfTheMovie, expected: nameOfTheMovie });
});

test('should change when watched is changed by the user', () => {
  fuck({ at: 1, value: true, expected: 'true' });
});

test('should change when Date Watched is changed by the user', () => {
  fuck({ at: 2, value: '2021-06-01', expected: '2021-06-01' });
});

test('should change when What You Learnt is changed by the user', () => {
  wrapper.find('textarea').simulate('change', { target: { value: 'Gang' } });
  expect(wrapper.find('textarea').prop('value')).toBe('Gang');
});

test('should not render Date Watched and What You Learnt when watched is false', () => {
  fuck({ at: 1, value: false, expected: 'false' });
  expect(wrapper).toMatchSnapshot();
});

test('form should become update when actionType is update', () => {
  handleMovieDeletion = jest.fn();
  const movie = movies[0];
  wrapper = shallow(
    <MovieForm
      actionType="update"
      handleFormSubmit={handleFormSubmit}
      movie={movie}
      handleMovieDeletion={handleMovieDeletion}
    />
  );

  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('input').at(0).prop('value')).toBe(movie.name);
  expect(wrapper.find('input').at(1).prop('value')).toBe(`${movie.watched}`);
  expect(wrapper.find('input').at(2).prop('value')).toBe(movie.dateWatched);
  expect(wrapper.find('textarea').prop('value')).toBe(movie.whatYouLearnt);
  expect(wrapper.find('img').prop('src')).toBe(movie.Poster);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  const expectedMovie: FireDBMovieItem = {
    name: movie.name,
    watched: movie.watched,
    dateWatched: movie.dateWatched,
    whatYouLearnt: movie.whatYouLearnt,
    Poster: movie.Poster,
    createdAt: movie.createdAt,
    updatedAt: expect.any(String),
  };
  expect(handleFormSubmit).toBeCalledWith(expectedMovie);

  wrapper.find('button').at(1).simulate('click');
  expect(handleMovieDeletion).toBeCalledTimes(1);
});

export {};
