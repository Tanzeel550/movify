import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SingleMovie from '../../../components/HomePage/SingleMovie';
import { movies } from '../../../consts/fixtures';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

beforeEach(() => {
  wrapper = shallow(<SingleMovie movie={movies[0]} />);
});

test('should render SingleMovie with the default props', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render SingleMovie when movie is not watched', () => {
  wrapper.setProps({ movie: movies[1] });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('p').text()).toMatch(
    'You really need to watch this movie'
  );
});
export {};
