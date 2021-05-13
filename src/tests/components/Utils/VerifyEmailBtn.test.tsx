import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { VerifyEmailBtn } from '../../../components/Utils/VerifyEmailBtn';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ErrorState } from '../../../types/ErrorTypes';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  setError: ActionCreatorWithPayload<ErrorState, string> | jest.Mock<any, any>;

beforeEach(() => {
  setError = jest.fn();
  wrapper = shallow(<VerifyEmailBtn setError={setError} />);
});

test('should render VerifyEmailBtn correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// TODO: convert sendEmailVerification in VerifyEmailBtn
// test('should call setError when button is pressed', () => {
//   wrapper.find('button').simulate('click');
//   expect(setError).toBeCalledTimes(1);
// });

export {};
