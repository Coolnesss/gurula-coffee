import 'react-native';
import React from 'react';
import Content from '../app/Content';
import PushController from '../app/PushController';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import FCM from 'react-native-fcm';

it('renders correctly', () => {
  FCM.unsubscribeFromTopic = jest.fn();
  FCM.subscribeToTopic = jest.fn();
  const tree = renderer.create(
    <Content />
  );
});
