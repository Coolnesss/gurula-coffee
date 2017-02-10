import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker'
var renderIf = require('render-if');


export default class QuietHours extends Component {

  constructor(props) {
    super(props);
    this.setTime = this.setTime.bind(this);

    this.state = {
      start: null,
      end: null,
      update: null
    }
  }

  componentWillMount() {
    AsyncStorage.multiGet(["start", "end", "update"]).then((values) => {
      let start = values[0][1];
      let end = values[1][1];
      let update = values[2][1];

      this.setState({
        start,
        end,
        update: eval(update)
      });
    });
  }

  setTime(time, type) {
    this.setState({
      [type]: time
    });
    AsyncStorage.setItem(type, time);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select your quiet hours</Text>
        <Text style={styles.text}>You won't be notified of coffee during this time{"\n"}</Text>
          {renderIf(!this.state.update)(
            <Text style={styles.disabled}>Notifications are disabled</Text>
          )}
        <View style={styles.timepickers}>
          <DatePicker
            style={{width: 200}}
            date={this.state.start}
            mode="time"
            disabled={!this.state.update}
            format="HH:mm"
            placeholder="Select start time"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => { this.setTime(time, "start") }}
          />
        <Text>{"\n"}</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.end}
            mode="time"
            format="HH:mm"
            disabled={!this.state.update}
            placeholder="Select end time"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => { this.setTime(time, "end") }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20
  },
  timepickers: {
    alignItems: 'flex-end',
    paddingTop: 50
  },
  disabled: {
    fontSize: 10
  }
});
