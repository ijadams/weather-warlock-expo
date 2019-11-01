import React from 'react';
import {styles} from '../constants/styles.const';
import * as fromPlaylist from '../constants/player.const';
import {
    View,
    Image,
    Text,
    StyleSheet
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
        setInterval(() => {
            this.setState({
                time: moment.tz("America/Chicago").format('HH:mm'),
            });
        }, 1000);
    }

    render() {
        const textColor = this.props.weather.isDay ? '#000' : '#fff';
        const subTextColor = this.props.weather.isDay ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
        return (
            <View style={weatherStyles.weatherContainer}>
                <Image style={styles.logo} source={this.props.weather.isDay ? fromPlaylist.LOGO_BLACK.module : fromPlaylist.LOGO_WHITE.module}/>
                <Text style={[styles.text, {fontFamily: "grenze-regular", fontSize: 24, marginTop: -10, marginBottom: 0, color: textColor}]}>
                    Weather for the Blind
                </Text>
                <Text style={[styles.text, {fontFamily: "grenze-regular", fontSize: 100, marginTop: -30, marginBottom: 0, color: textColor}]}>
                    {this.props.weather.temperature}°
                </Text>
                <Text style={[styles.text, {
                    fontFamily: "grenze-regular",
                    fontSize: 20,
                    textAlign: "center",
                    letterSpacing: 1,
                    marginBottom: 6,
                    color: textColor
                }]}>
                    New Orleans, LA
                    <Text style={[weatherStyles.subText, {fontFamily: "grenze-regular", fontSize: 18, textAlign: "center", color: textColor}]}>
                        {'\n'}{this.state.time}
                    </Text>
                </Text>
                <View style={weatherStyles.container}>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Conditions
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.summary}
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Humidity
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.humidity}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Humidity
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.humidity}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Wind Speed
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.windSpeed}mph
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Percipitation
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.precipProbability}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Wind Direction
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.windBearing}
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        Pressure
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.pressure}mb
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                        UV Index
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                            {'\n'}{this.props.weather.uvIndex}
                        </Text>
                    </Text>
                </View>

            </View>
        );
    }
}

const weatherStyles = StyleSheet.create({
    weatherContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        backgroundColor: "transparent",
        marginTop: 36,
        marginBottom: 12,
        width: 140,
        height: 32
    },
    container: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        maxWidth: '100%',
        height: 'auto',
        marginLeft: '25%',
        marginRight: '25%',
    },
    text: {
        width: '50%',
        color: 'rgba(0,0,0,0.8)',
        marginBottom: 6,
        textAlign: 'center',
        fontSize: 12
    },
    item: {
        width: '100%',
        textAlign: 'center'
    },
    subText: {
        fontSize: 14,
        color: 'rgba(0,0,0,1)'
    }
});
