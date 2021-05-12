import { shallow, ShallowWrapper } from 'enzyme';
import Footer, {
  SkillsComponent,
} from '../../../components/BaseComponents/Footer';
import React from 'react';
import { skills1 } from '../../../consts/fixtures';

test('should render footer correctly', () => {
  const wrapper: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  > = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});

test('should render SkillsComponent correctly', () => {
  const wrapper = shallow(<SkillsComponent skills={skills1} />);
  expect(wrapper).toMatchSnapshot();
});

export {};
