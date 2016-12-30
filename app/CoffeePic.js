import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const coffeeUrl = "http://gurula.wtf/kahvi/kahvi.jpg";

const CoffeePic = () => {
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
