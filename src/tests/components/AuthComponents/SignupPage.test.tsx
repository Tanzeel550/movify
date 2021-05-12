import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { SingUpPage } from '../../../components/AuthComponents/SignupPage';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ErrorState } from '../../../types/ErrorTypes';
import { email, password } from '../../../consts/fixtures';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  setError: ActionCreatorWithPayload<ErrorState, string> | jest.Mock<any, any>,
  startSignUpWithEmailPass: jest.Mock<any, any>;

beforeEach(() => {
  setError = jest.fn();
  startSignUpWithEmailPass = jest.fn();
  wrapper = shallow(
    <SingUpPage
      // @ts-ignore
      setError={setError}
      startSignUpWithEmailPass={startSignUpWithEmailPass}
    />
  );
});

test('should render SignUp page component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set value of email input to the value provided', () => {
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: email } });
  expect(wrapper.find('input').at(0).props().value).toBe(email);
});

test('should set value of password input to the value provided', () => {
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: password } });
  expect(wrapper.find('input').at(1).props().value).toBe(password);
});

test('should set value of confirmPassword input to the value provided', () => {
  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value: password } });
  expect(wrapper.find('input').at(2).props().value).toBe(password);
});

test('should submit form correctly', () => {
  const elems = wrapper.find('input');
  elems.at(0).simulate('change', { target: { value: email } });
  elems.at(1).simulate('change', { target: { value: password } });
  elems.at(2).simulate('change', { target: { value: password } });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(startSignUpWithEmailPass).toBeCalledWith({ email, password });
});

test('should not submit form because email is invalid', () => {
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: email.replace('@', '') } });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(setError).toBeCalledWith({
    message: 'This email is invalid. Please type a correct email...',
    title: 'SignUp',
  });
});

test('should not submit form due to passwords don"t match', () => {
  const elems = wrapper.find('input');
  elems.at(0).simulate('change', { target: { value: email } });
  elems.at(1).simulate('change', { target: { value: password } });
  elems.at(2).simulate('change', { target: { value: password + password } });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(setError).toBeCalledWith({
    message: "Passwords don't match.",
    title: 'SignUp',
  });
});

export {};
