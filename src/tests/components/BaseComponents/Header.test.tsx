import { shallow } from 'enzyme';
import { Header } from '../../../components/BaseComponents/Header';
import React from 'react';

test('should render header correctly when user is logged in and email is verified', () => {
  expect(
    shallow(<Header isAuthenticated={true} emailVerified={true} />)
  ).toMatchSnapshot();
});

test('should render header correctly when user is logged in but email is not verified', () => {
  expect(
    shallow(<Header isAuthenticated={true} emailVerified={false} />)
  ).toMatchSnapshot();
});

test('should render header correctly when user is logged out', () => {
  expect(
    shallow(<Header isAuthenticated={false} emailVerified={false} />)
  ).toMatchSnapshot();
});
