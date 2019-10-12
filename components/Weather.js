import React from 'react';
import {styles} from '../constants/styles.const';
import * as fromPlaylist from '../constants/player.const';
import {
  View,
  Image,
  Text
} from "react-native";
import moment from 'moment-timezone';

export class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment.tz("America/Chicago").format('HH:mm'),
		};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        time: moment.tz("America/Chicago").format('HH:mm'),
      });
    }, 1000);
  }
  
  render() {
    return (
      <View style={styles.weatherContainer}>
        <Image style={styles.logo} source={fromPlaylist.LOGO_BLACK.module} />
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular", fontSize: 76, marginBottom: 8 }]}>
            {this.props.weather.temperature}°
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular", fontSize: 20, marginBottom: 8 }]}>
            New Orleans, LA 
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            {this.props.summary}
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            Humidity: {this.props.weather.humidity}%
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            Wind Speed: {this.props.weather.windSpeed}mph
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
          Chance of percipitation: {this.props.weather.precipProbability}%
          </Text>
          <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            Local Time: {this.state.time}
          </Text>
      </View>
    );
  }
  }