'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';
import PushController from './PushController';

class AppSettings extends Component {

  constructor() {
    super();
    this.toggleUpdateState = this.toggleUpdateState.bind(this);
    this.state = {update: false};
  }

  componentWillMount() {
    AsyncStorage.getItem("update").then((value) => {
        if (value === "true") {
          this.setState({update: true});
        } else if (value === "false") {
          this.setState({update: false});
        }
    }).done();
  }

  toggleUpdateState() {
    if (!this.state.update) {
      AsyncStorage.setItem("update", "true");
    } else {
      AsyncStorage.setItem("update", "false");
    }
    this.setState({update: !this.state.update});
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

            <SettingsList.Header headerText='Notifications' />
              <SettingsList.Item
                hasSwitch={true}
                switchState={this.state.update}
                switchOnValueChange={this.toggleUpdateState}
                hasNavArrow={false}
                title='Receive notifications (beta)'
                titleStyle={{fontSize:16}}
              />
              <SettingsList.Item
                hasNavArrow={true}
                title='Set quiet hours'
                titleStyle={{fontSize:16}}
                onPress={() => Actions.quietHours()}
              />

            <SettingsList.Header headerText='Misc'/>
              <SettingsList.Item
                hasNavArrow={true}
                title='How does it work'
                titleStyle={{fontSize:16}}
                onPress={() => Actions.howItWorks()}
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
