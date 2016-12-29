import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import SettingsScreen from './SettingsScreen';
import Content from './Content';


const styles = StyleSheet.create({
  settings: {
    flex: 1,
    marginTop: 35
  }
})

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="content"
          component={Content}
          title="GurulaCoffee"
          initial
        />
      <Scene
          key="settingsScreen"
          component={SettingsScreen}
          title="Settings"
        />
      </Scene>
    </Router>
  );
}

export default App;
