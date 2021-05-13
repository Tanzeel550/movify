import React from 'react';
import { shallow } from 'enzyme';
import AllMoviesList from '../../../components/HomePage/AllMoviesList';
import { movies } from '../../../consts/fixtures';

test('AllMoviesList Component should be rendered correctly', () => {
  const wrapper = shallow(<AllMoviesList movies={movies} />);
  expect(wrapper).toMatchSnapshot();
});

export {};
