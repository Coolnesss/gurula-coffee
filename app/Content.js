import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button } from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

const apiUrl = "https://gurula-coffee.herokuapp.com/state"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 100,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  response: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#841584'
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.checkCoffeeState = this.checkCoffeeState.bind(this);

    this.state = {
      response: ""
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      this.checkCoffeeState();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>
            Gurula Coffee Informer
          </Text>
          <Text style={styles.welcome}>
            Use this app to get a notification if there's coffee in Gurula.
            You can also press the button to find out if there's coffee right now.
          </Text>
          <Button
            onPress={this.checkCoffeeState}
            title="Check now"
            color="red"
          />
        <Text style={styles.response}> {this.state.response}
        </Text>
        <PushController />
        </View>
    );
  }

  checkCoffeeState() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          response: responseJson.state
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
}
