import 'react-native';
import React from 'react';
import Content from '../app/Content';
import AppSettings from '../app/AppSettings';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import SettingsList from 'react-native-settings-list';

it('renders correctly', () => {
  const tree = renderer.create(
    <AppSettings />
  );
});
