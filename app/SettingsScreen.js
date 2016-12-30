import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import AppSettings from './AppSettings';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <AppSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    marginTop: 35
  }
});

export default SettingsScreen;
