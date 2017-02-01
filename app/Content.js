import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button } from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import AwesomeButton from 'react-native-awesome-button';

const apiUrl = "http://coffeeapi.g7xd2rhrfs.eu-central-1.elasticbeanstalk.com/"

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
  button: {
    flexDirection: 'row',
    margin: 20
  },
  checkButtonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 4
  },
  checkButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  wrongResult: {
    fontSize: 16
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.checkCoffeeState = this.checkCoffeeState.bind(this);
    this.parseResponse = this.parseResponse.bind(this);

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

  parseResponse() {
    let response = this.state.response;
    if (response === "NO LIGHTS") {
      return "The lights don't seem to be on in Gurula.";
    }
    return this.state.response + " cups of coffee";
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>
            Gurula Coffee Informer
          </Text>
            <View style={styles.button}>
            <AwesomeButton
                backgroundStyle={styles.checkButtonBackground}
                          labelStyle={styles.checkButtonLabel}
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
                              text: this.parseResponse(),
                              onPress: this.checkCoffeeState,
                              backgroundColor: '#339944'
                            }
                          }}
                          buttonState={this.state.buttonState}
                          />
                        <Text style={styles.response}> </Text>
                      </View>
                      <Text
                        style={styles.wrongResult}
                        onPress={() => Actions.wrongResult()}>
                        Wrong result?
                      </Text>
                      <View style={styles.button}>
                        <AwesomeButton
                          backgroundStyle={styles.checkButtonBackground}
                          labelStyle={styles.checkButtonLabel}
                          states={{
                            default: {
                              text: 'See the camera photo',
                              onPress: () => Actions.coffeePic(),
                              backgroundColor: '#1155DD'
                            }
                         }} />
                         <Text style={styles.response}> </Text>
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
