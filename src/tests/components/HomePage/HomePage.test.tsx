import { shallow } from 'enzyme';
import { HomePage } from '../../../components/HomePage/HomePage';
import { email, movies } from '../../../consts/fixtures';
import React from 'react';

test('HomePage should be rendered correctly', () => {
  // @ts-ignore
  const wrapper = shallow(<HomePage movies={movies} name="Mike Ahmed" />);
  expect(wrapper).toMatchSnapshot();
});

test('Home Page should not display any movie', () => {
  // @ts-ignore
  const wrapper = shallow(<HomePage movies={[]} name={email} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('h1').text()).toMatch('Please add Movies to Continue...');
});

export {};
