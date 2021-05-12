import { shallow, ShallowWrapper } from 'enzyme';
import GoogleFB from '../../../components/AuthComponents/GoogleFB';
import React from 'react';

test('should render GoogleFB component correctly', () => {
  const wrapper: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  > = shallow(<GoogleFB />);
  expect(wrapper).toMatchSnapshot();
});

export {};
