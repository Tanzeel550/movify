import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CreatePage } from '../../components/CreatePage';

let history,
  startCreateMovie,
  wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

beforeEach(() => {
  history = jest.fn();
  startCreateMovie = jest.fn();
  wrapper = shallow(
    <CreatePage
      emailVerified={true}
      history={{ push: history }}
      startCreateMovie={startCreateMovie}
    />
  );
});

test('should render CreatePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

export {};
