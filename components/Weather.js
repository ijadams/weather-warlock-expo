import React from 'react';
import {styles} from '../constants/styles.const';
import * as fromPlaylist from '../constants/player.const';
import {
  View,
  Image,
  Text
} from "react-native";
export class Weather extends React.Component {
    render() {
      return (
        <View style={styles.weatherContainer}>
          <Image style={styles.logo} source={fromPlaylist.LOGO_BLACK.module} />
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular", fontSize: 76, marginBottom: 8 }]}>
              {this.props.temperature}°
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular", fontSize: 20, marginBottom: 8 }]}>
              New Orleans, LA 
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
              {this.props.summary}
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
              Humidity: {this.props.humidity}%
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
              Wind Speed: {this.props.windSpeed}mph
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
            Chance of percipitation: {this.props.precipProbability}%
            </Text>
            <Text style={[styles.text, { fontFamily: "cutive-mono-regular" }]}>
              Local Time: {this.props.time}
            </Text>
        </View>
      );
    }
  }