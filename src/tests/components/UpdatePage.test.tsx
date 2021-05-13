import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UpdatePage } from '../../components/UpdatePage';
import { movies } from '../../consts/fixtures';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  startDeleteMovie: jest.Mock<any, any>,
  startUpdateMovie: jest.Mock<any, any>,
  history: { push: (link: string) => void };

beforeEach(() => {
  startUpdateMovie = jest.fn();
  startDeleteMovie = jest.fn();
  history = {
    push: (link: string) => {},
  };
  wrapper = shallow(
    <UpdatePage
      movie={movies[0]}
      emailVerified={true}
      startUpdateMovie={startUpdateMovie}
      startDeleteMovie={startDeleteMovie}
      // @ts-ignore
      history={history}
    />
  );
});

test('should render UpdatePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should not render UpdatePage because there is no movie found', () => {
  wrapper.setProps({ movie: null });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('h1').text()).toMatch(
    'No Movie found on this page. Please go back and update some other Movie'
  );
});

export {};
