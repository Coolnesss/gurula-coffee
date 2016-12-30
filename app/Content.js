import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button } from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import AwesomeButton from 'react-native-awesome-button';

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
  },
  howitworks: {
    color: "gray"
  },
  button: {
    flexDirection: 'row',
    margin: 20
  },
  loginButtonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 5
  },
  loginButtonLabel: {
    color: 'white'
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.checkCoffeeState = this.checkCoffeeState.bind(this);

    this.state = {
      response: "",
      buttonState: 'idle'
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
          <View style={styles.button}>
          <AwesomeButton
              backgroundStyle={styles.loginButtonBackground}
                        labelStyle={styles.loginButtonLabel}
                        transitionDuration={200}
                        states={{
                          idle: {
                            text: 'Check for coffee',
                            onPress: this.checkCoffeeState,
                            backgroundColor: '#1155DD',
                          },
                          busy: {
                            text: 'Checking',
                            backgroundColor: '#002299',
                            spinner: true,
                          },
                          success: {
                            text: this.state.response,
                            onPress: this.checkCoffeeState,
                            backgroundColor: '#339944'
                          }
                        }}
                        buttonState={this.state.buttonState}
                        />
                      <Text style={styles.response}> {""}</Text>

                    </View>
                    <PushController />
        </View>
    );
  }

  checkCoffeeState() {
    this.setState({buttonState: "busy"});
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          response: responseJson.state,
          buttonState: "success"
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
}
