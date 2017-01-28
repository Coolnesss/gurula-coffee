import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import FCM from 'react-native-fcm';

export default class PushController extends Component {

  componentDidMount() {
    FCM.removeAllDeliveredNotifications();

    FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });

        if (this.notificationListener) this.notificationListener.remove();
        this.notificationListener = FCM.on('notification', (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if (notif.local_notification){
              //this is a local notification
            }
            if (notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
            if (!notif.local_notification) {
              AsyncStorage.getItem("update").then((value) => {
                  if (value === "true") {
                    FCM.removeAllDeliveredNotifications();
                    FCM.presentLocalNotification({
                      title: "Coffee notification",                     // as FCM payload
                      body: "There's around " + notif.coffee +  " cups available!"
                    })
                  }
              })
            }
            //console.log(notif);
            //console.log("ok")
        });
        this.refreshTokenListener = FCM.on('refreshToken', (token) => {
            // fcm token may not be available on first load, catch it here
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
