import 'react-native';
import React from 'react';
import Content from '../app/Content';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import QuietHours from '../app/QuietHours';

import { shallow } from 'enzyme';
import { AsyncStorage, Text } from 'react-native';

it('renders correctly', () => {
  const tree = renderer.create(
    <QuietHours />
  );
});

it("when notifications are disabled, shows that they are disabled", () => {
  AsyncStorage.multiGet = jest.fn((item) => {
    return new Promise((resolve, reject) => {
        resolve([["start", "22:00"], ["end", "10:00"], ["update", "false"]]);
      });
  });

  const wrapper = shallow(<QuietHours />);
  expect(wrapper.containsMatchingElement(<Text>Notifications are disabled</Text>)).toBe(true);
});
