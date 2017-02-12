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
      <View style={{backgroundColor:'#f6f6f6', flex:1}}>
        <View style={{borderBottomWidth:1, backgroundColor:'#263238',borderColor:'#c8c7cc'}}>
          <Text style={{color:'white',marginTop:35,marginBottom:15, marginLeft:15,fontWeight:'bold',fontSize:20}}>Settings</Text>
        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>

              <SettingsList.Item
               hasNavArrow={false}
               title='Notifications'
               titleStyle={{color:'#009688', marginBottom:10, fontWeight:'500'}}
               itemWidth={50}
               borderHide={'Both'}
             />
              <SettingsList.Item
                hasSwitch={true}
                switchState={this.state.update}
                switchOnValueChange={this.toggleUpdateState}
                hasNavArrow={false}
                title='Receive notifications (beta)'
                itemWidth={70}
                titleStyle={{color:'black', fontSize: 16}}
              />
              <SettingsList.Item
                itemWidth={70}
                titleStyle={{color:'black', fontSize: 16}}
                hasNavArrow={true}
                title='Set quiet hours'
                onPress={() => Actions.quietHours()}
              />

              <SettingsList.Item
               hasNavArrow={false}
               title='Misc'
               titleStyle={{color:'#009688', marginBottom:10, fontWeight:'500'}}
               itemWidth={50}
               borderHide={'Both'}
             />
              <SettingsList.Item
                itemWidth={70}
                titleStyle={{color:'black', fontSize: 16}}
                hasNavArrow={true}
                title='How does it work'
                onPress={() => Actions.howItWorks()}
              />
          </SettingsList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    marginRight:20,
    alignSelf:'center',
    width:20,
    height:24,
    justifyContent:'center'
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});

module.exports = AppSettings;
