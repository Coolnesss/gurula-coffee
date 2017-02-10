require('react-native-mock/mock'); // <-- side-effects!!!

import 'react-native';
import React from 'react';
import PushController from '../app/PushController';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import FCM from 'react-native-fcm';
import { shallow } from 'enzyme';
import { AsyncStorage } from 'react-native';
var MockDate = require('mockdate');
var moment = require('moment');

beforeEach(() => {
  FCM.unsubscribeFromTopic = jest.fn();
  FCM.subscribeToTopic = jest.fn();
  FCM.presentLocalNotification = jest.fn();
  FCM.removeAllDeliveredNotifications = jest.fn();
});

function setAsyncStorageMocks(retValue) {
  AsyncStorage.multiGet = jest.fn((item) => {
    return new Promise((resolve, reject) => {
        resolve(retValue);
      });
  });
}

it('works correctly', () => {
  const tree = renderer.create(
    <PushController />
  );
});

describe("Notifications", () => {

  it('sends a notification if notifyUser is called when quiet hours are not active', async () => {
    setAsyncStorageMocks([["update", "true"], ["start", "22:00"], ["end", "10:00"]]);

    MockDate.set(moment().startOf('day').hour(21).minute(0));
    const wrapper = shallow(<PushController />);

    await wrapper.instance().notifyUser();
    expect(FCM.presentLocalNotification).toBeCalled();
  });

  it('doesnt send a push notification when quiet hours are active', async () => {
    setAsyncStorageMocks([["update", "true"], ["start", "22:00"], ["end", "10:00"]]);

    MockDate.set(moment().startOf('day').hour(23).minute(0));
    const wrapper = shallow(<PushController />);

    await wrapper.instance().notifyUser();
    expect(FCM.presentLocalNotification).not.toBeCalled();
  });

  it('doesnt send notification when notifications are not enabled', async () => {
    setAsyncStorageMocks([["update", "false"], ["start", "22:00"], ["end", "10:00"]]);

    const wrapper = shallow(<PushController />);

    await wrapper.instance().notifyUser();
    expect(FCM.presentLocalNotification).not.toBeCalled();
  });

  it("sends notification when notifications are enabled but quiet hours are not set", async () => {
    setAsyncStorageMocks([["update", "true"], ["start", undefined], ["end", undefined]]);

    const wrapper = shallow(<PushController />);

    await wrapper.instance().notifyUser();
    expect(FCM.presentLocalNotification).toBeCalled();
  });
});
