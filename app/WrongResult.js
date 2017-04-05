import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import AwesomeButton from 'react-native-awesome-button';
import { Madoka } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import { Button } from 'react-native-material-design';

const apiUrl = "http://coffeeapi.g7xd2rhrfs.eu-central-1.elasticbeanstalk.com/"

export default class WrongResult extends Component {

  constructor(props) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.postData = this.postData.bind(this);
      this.scrollToBottom = this.scrollToBottom.bind(this);
      this.contentHeight = 0;
      this.scrollViewHeight = 0;
      this.state = {
        selected: 0.0,
        response: "",
        buttonState: 'idle'
      }
    }

    onChange(text) {
        let newText = '';
        let numbers = '0123456789.';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        this.setState({selected: newText})
    }

    postData() {
      this.setState({buttonState: "busy"});
      fetch(apiUrl + "samples", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sample: {
              label: this.state.selected
            }
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            response: "OK",
            buttonState: "success"
          });
        })
        .catch((error) => {
          this.setState({
            buttonState: "fail"
          })
        });
    }

    scrollToBottom(animated = true) {
      const scrollHeight = this.contentHeight - this.scrollViewHeight;
      if (scrollHeight > 0) {
        const scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollTo({x: 0, y: scrollHeight, animated});
      }
    }

     render() {
       return(<View style={styles.wrapper}>
          <Text style={styles.title}>Wrong result?</Text>
           <Text style={styles.subtext}>
             Step 1. Go to Gurula{"\n"}
             Step 2. Look at the coffee pan; there's a scale that shows the amount of coffee{"\n"}
             Step 3. Estimate how much coffee there is and if it's significantly different from the predicted amount, enter the correct amount here{"\n"}
             Step 4. Press submit.
           </Text>
           <AwesomeButton
             backgroundStyle={styles.checkButtonBackground}
             labelStyle={styles.checkButtonLabel}
             states={{
                        default: {
                          text: 'Press to begin',
                          onPress: () => this.refs.modal.open(),
                          backgroundColor: '#009688'
                        }
                       }}
           />

          <Modal style={[styles.modal]} position={"center"} ref={"modal"}>
              <Text style={[styles.text, {fontSize: 30}]}>Enter amount of coffee</Text>
              <Text style={[styles.text]}>(0 to 14 cups)</Text>
                <View style={[styles.card1]}>
                  <Madoka
                    label={'Coffee (cups)'}
                    borderColor={'#aee2c9'}
                    onChangeText={ (value) => {this.setState({selected: value})}}
                    labelStyle={{ color: '#009688' }}
                    inputStyle={{ color: '#f4a197' }}
                    keyboardType="numeric"
                  />
                 </View>
                 <View style={{flexDirection: 'row'}}>
                   <AwesomeButton
                       backgroundStyle={styles.checkButtonBackground}
                                 labelStyle={styles.checkButtonLabel}
                                 transitionDuration={200}
                                 states={{
                                   idle: {
                                     text: 'Submit',
                                     onPress: this.postData,
                                     backgroundColor: '#009688',
                                   },
                                   success: {
                                     text: "Done",
                                     onPress: () => Actions.pop(),
                                     backgroundColor: '#339944'
                                   },
                                   fail: {
                                     text: "FAILED",
                                     backgroundColor: "red"
                                   }
                                 }}
                                 buttonState={this.state.buttonState}
                                 />
                           </View>
                  <Text style={{fontSize: 20, fontColor: "black", textAlign: "center"}}>Swipe down to exit</Text>
          </Modal>
       </View>
     );
     }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 12
  },
  button: {
    padding: 12
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 40,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  subtext: {
    fontSize: 20,
    padding: 12
  },
  checkButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  checkButtonBackground: {
    borderRadius: 4,
    height: 40,
    margin: 20,
    alignItems: 'flex-end'
  },
  modal: {
    justifyContent: 'center',
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop:20
  }
});
