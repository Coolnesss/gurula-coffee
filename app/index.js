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
import WrongResult from './WrongResult';
import QuietHours from './QuietHours';

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
        <Scene key="contentTab" title="Coffee" icon={TabIcon} hideNavBar={true}>
          <Scene key="content"
            hideNavBar={true}
            component={Content}
            title=""
            initial
          />
        <Scene key="wrongResult"
              component={WrongResult}
              title=""
            />
          <Scene key="coffeePic"
              component={CoffeePic}
              title=""
            />
          </Scene>
        <Scene key="settingsTab" title="Settings" icon={TabIcon}>
            <Scene
              hideNavBar={true}
              key="settingsScreen"
              component={SettingsScreen}
              title=""
            />
            <Scene key="howItWorks"
              component={HowItWorks}
              title=""
            />
          <Scene key="quietHours"
            component={QuietHours}
            title=""
          />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

export default App;
