import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const HowItWorks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        How does it work?
      </Text>
      <Text style={styles.body}>
        We're using machine learning to figure out how much coffee there is currently in the Gurula pan by looking at the camera. You can check the camera image to verify the algorithm's results. Any ideas and contributions are welcome at
      </Text>
      <Text style={styles.address}>
        https://github.com/Coolnesss/coffee-api
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  body: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    fontWeight: '100'
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  address: {
    fontSize: 15,
    margin: 5,
    borderRadius: 5
  }
});

export default HowItWorks;
