'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button, Image, AsyncStorage } from 'react-native';
import SettingsList from 'react-native-settings-list';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';

const timerInterval = 60000;
const apiUrl = "http://coffeeapi.g7xd2rhrfs.eu-central-1.elasticbeanstalk.com/"

class AppSettings extends Component {

  constructor() {
    super();
    this.toggleUpdateState = this.toggleUpdateState.bind(this);
    this.setTimedUpdates = this.setTimedUpdates.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.state = {update: false};
  }

  componentDidMount() {
    AsyncStorage.getItem("update").then((value) => {
        if (value === "true") {
          this.setState({update: true});
          this.setTimedUpdates();
        } else if (value === "false") {
          this.setState({update: false});
        }
    }).done();
  }

  notifyCoffeeState() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        let date = new Date(Date.now() + (1000));

        PushNotification.cancelAllLocalNotifications();

        PushNotification.localNotification({
          message: "Coffee status: " + responseJson.state,
          bigText: "State of coffee is " + responseJson.state,
          subText: "Coffee notification"
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setTimedUpdates() {
    const intervalId = BackgroundTimer.setInterval(() => {
      this.notifyCoffeeState();
    }, timerInterval);

    this.setState({intervalId: intervalId});
  }

  clearInterval() {
    BackgroundTimer.clearInterval(this.state.intervalId);
  }

  toggleUpdateState() {
    if (!this.state.update) {
      AsyncStorage.setItem("update", "true");
    } else {
      AsyncStorage.setItem("update", "false");
    }

    this.setState({update: !this.state.update}, () => {
      if (this.state.update) {
        this.setTimedUpdates();
      } else {
        this.clearInterval();
      }
    });
  }


  render() {
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
          <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.update}
              switchOnValueChange={this.toggleUpdateState}
              hasNavArrow={false}
              title='Update in background (experimental)'
              titleStyle={{fontSize:16}}
            />
          </SettingsList>
        </View>
        <PushController />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});

module.exports = AppSettings;
