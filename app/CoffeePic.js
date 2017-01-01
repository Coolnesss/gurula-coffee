import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


const CoffeePic = () => {
  // Fix for bug in React Native
  var coffeeUrl = "http://gurula.wtf/kahvi/kahvi.jpg";
  coffeeUrl += '?random_number=' + new Date().getTime()

  return (
    <View style={styles.container}>
      <Image
          style={styles.image}
          source={{uri: coffeeUrl}}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }
});

export default CoffeePic;
