import { shallow } from 'enzyme';
import VerifiedComp from '../../../components/Utils/VerifiedComp';

import React from 'react';

const Comp = () => <h1>Hello from Comp </h1>;

test('should render the component because the email is verified', () => {
  const wrapper = shallow(
    <VerifiedComp emailVerified={true} children={<Comp />} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should not render the component because the email is not verified', () => {
  const wrapper = shallow(
    <VerifiedComp emailVerified={false} children={<Comp />} />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('h3').text()).toMatch(
    'You cannot access this page because your Email is not verified'
  );
});

export {};
