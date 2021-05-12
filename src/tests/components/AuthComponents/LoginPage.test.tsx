import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LoginPage } from '../../../components/AuthComponents/LoginPage';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ErrorState } from '../../../types/ErrorTypes';
import { email, password } from '../../../consts/fixtures';

// jest.setTimeout(120000); // 2 minutes = 12000 milliseconds

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  setError: ActionCreatorWithPayload<ErrorState, string> | jest.Mock<any, any>,
  startLoginWithEmailPass: jest.Mock<any, any>;

beforeEach(() => {
  setError = jest.fn();
  startLoginWithEmailPass = jest.fn();
  wrapper = shallow(
    <LoginPage
      // @ts-ignore
      setError={setError}
      startLoginWithEmailPass={startLoginWithEmailPass}
    />
  );
});

test('should render GoogleFB component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set email when emailText change', () => {
  const elem = wrapper.find('input').at(0);
  elem.simulate('change', { target: { value: email } });
  expect(wrapper.state('email')).toBe(email);
});

test('should set password when passwordText change', () => {
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: password } });
  expect(wrapper.state('password')).toBe(password);
});

test('should submit the login form successfully because email and password are valid', () => {
  wrapper.setState({ email, password });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(startLoginWithEmailPass).toBeCalledWith({ email, password });
  // expect(wrapper.state('email')).toBe('');
  // expect(wrapper.state('password')).toBe('');
});

test('should not submit the login form because email is invalid', () => {
  wrapper.setState({ email: 'unknownPerson123' });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(setError).toBeCalledWith({
    message: 'This email is invalid. Please type a valid email...',
    title: 'Login',
  });
});

test('should not submit the login form because password is invalid', () => {
  wrapper.setState({ email, password: '' });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(setError).toBeCalledWith({
    message: 'Please type a valid password',
    title: 'Login',
  });
});

export {};
