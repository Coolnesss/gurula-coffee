'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button, Image } from 'react-native';
import SettingsList from 'react-native-settings-list';

class AppSettings extends Component {

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {update: false};
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
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Update every minute'
              titleStyle={{fontSize:16}}
            />
          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value) {
    this.setState({update: value});
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
