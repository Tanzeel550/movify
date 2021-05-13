import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchComponent from '../../../components/FormComponent/SearchComponent';
import { moviesFromAPIBySearch } from '../../../consts/fixtures';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  handleSearchItemClick: jest.Mock<any, any>;

beforeEach(() => {
  handleSearchItemClick = jest.fn();
  wrapper = shallow(
    <SearchComponent
      movies={moviesFromAPIBySearch}
      handleSearchItemClick={handleSearchItemClick}
    />
  );
});

test('should render SearchComponent correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handleSearchItemClick be handled correctly', () => {
  wrapper.find('li').at(2).simulate('click');
  expect(handleSearchItemClick).toBeCalledWith(moviesFromAPIBySearch[2].Title);
});
