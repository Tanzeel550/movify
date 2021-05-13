import { shallow } from 'enzyme';
import MovieDetails from '../../../components/FormComponent/MovieDetails';
import { movieFromAPIByTitle } from '../../../consts/fixtures';
import React from 'react';

test('should render MovieDetails correctly', () => {
  expect(
    shallow(<MovieDetails movie={movieFromAPIByTitle} />)
  ).toMatchSnapshot();
});
