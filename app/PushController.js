import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import FCM from 'react-native-fcm';

export default class PushController extends Component {

  constructor(props) {
    super(props);
    this.notifyUser = this.notifyUser.bind(this);
  }

  notifyUser(message) {
    AsyncStorage.multiGet(["update", "start", "end"]).then((values) => {

      // User doesn't want notifications
      if (values[0][1] === "true") return;
      // Quiet hours
      let start = values[1][1];
      let end = values[2][1];
      let current = new Date().getHours() + ":" + new Date().getMinutes();

      if (current < start && current > end) {
          FCM.removeAllDeliveredNotifications();
          FCM.presentLocalNotification({
            title: "topkek",
            body: message + " cups available right now!"
          });
      }
    });
    return true;
  }


  componentDidMount() {
    FCM.removeAllDeliveredNotifications();
    if (this.notificationListener) this.notificationListener.remove();

    this.notificationListener = FCM.on('notification', (notif) => {

        if (!notif.local_notification) {
          this.notifyUser(notif.coffee);
        }

    });
    FCM.unsubscribeFromTopic('/topics/coffee');
    FCM.subscribeToTopic('/topics/coffee');
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
    FCM.unsubscribeFromTopic('/topics/coffee');
  }

  render() {
    return null;
  }
}
