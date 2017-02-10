import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import FCM from 'react-native-fcm';
var moment = require('moment');


export default class PushController extends Component {

  constructor(props) {
    super(props);
    this.notifyUser = this.notifyUser.bind(this);
  }

  notifyUser(message) {
    AsyncStorage.multiGet(["update", "start", "end"]).then((values) => {
      // User doesn't want notifications
      if (values[0][1] === "false") return;

      // Quiet hours
      let current = moment().format('HH:MM');
      let start = moment().format(values[1][1]);
      let end = moment().format(values[2][1]);

      // If the quiet hours aren't set, or they aren't in effect, send notification
      if ((!values[1][1] || !values[2][1]) || (current < start && current > end)) {
          FCM.removeAllDeliveredNotifications();
          FCM.presentLocalNotification({
            title: "Coffee is ready",
            body: message + " cups available right now!"
          });
      }
    });
  }


  componentDidMount() {
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
    FCM.unsubscribeFromTopic('/topics/coffee');
  }

  render() {
    return null;
  }
}
