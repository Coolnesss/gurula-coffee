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
import { Kaede } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux';


const apiUrl = "http://10.0.2.2:3000/"

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
      fetch(apiUrl + "sample", {
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
          console.error(error);
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
       return (
         <ScrollView
           ref='scrollView'
           onContentSizeChange={(w, h) => this.contentHeight = h}
           onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
           style={styles.container}
           contentContainerStyle={styles.content}
           >
        <Text style={styles.title}>Wrong result?</Text>
        <Text style={styles.subtext}>
          Step 1. Go to Gurula{"\n"}
          Step 2. Look at the coffee pan; there's a scale that shows the amount of coffee{"\n"}
          Step 3. Estimate how much coffee there is and if it's significantly different from the predicted amount, enter the correct amount here{"\n"}
          Step 4. Press submit.
        </Text>
            <View style={[styles.card1]}>
               <Kaede
                 onChangeText={ (value) => {this.setState({selected: value}); this.scrollToBottom() }}
                 style={styles.input}
                 label={'Amount of coffee'}
                 labelStyle={{
                   color: 'white',
                   backgroundColor: '#1155DD',
                 }}
                 inputStyle={{
                   color: 'white',
                   backgroundColor: 'gray',
                 }}
                 keyboardType="numeric"
               />
             </View>
             <View style={styles.button}>
             <AwesomeButton
                 backgroundStyle={styles.checkButtonBackground}
                           labelStyle={styles.checkButtonLabel}
                           transitionDuration={200}
                           states={{
                             idle: {
                               text: 'Submit',
                               onPress: this.postData,
                               backgroundColor: '#1155DD',
                             },
                             busy: {
                               text: 'Sending',
                               backgroundColor: '#002299',
                               spinner: true,
                             },
                             success: {
                               text: "Done",
                               onPress: () => Actions.content(),
                               backgroundColor: '#339944'
                             },
                             fail: {
                               text: "FAILED",
                               backgroundColor: "red"
                             }
                           }}
                           buttonState={this.state.buttonState}
                           />
                           <Text style={styles.response}> </Text>

                       </View>
           </ScrollView>
       );
     }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
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
    height: 40
  }
});
