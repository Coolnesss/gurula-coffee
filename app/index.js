import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import SettingsScreen from './SettingsScreen';
import Content from './Content';
import CoffeePic from './CoffeePic';
import HowItWorks from './HowItWorks';

console.disableYellowBox = true;

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}


const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
        <Scene key="contentTab" title="Coffee" icon={TabIcon}>
          <Scene key="content"
            component={Content}
            title=""
            initial
          />
          <Scene key="coffeePic"
              component={CoffeePic}
              title=""
            />
          </Scene>
        <Scene key="settingsTab" title="Settings" icon={TabIcon}>
            <Scene
              key="settingsScreen"
              component={SettingsScreen}
              title=""
            />
            <Scene key="howItWorks"
              component={HowItWorks}
              title=""
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

export default App;
