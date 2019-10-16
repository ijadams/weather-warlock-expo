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
        return (
            <View style={weatherStyles.weatherContainer}>
                <Image style={styles.logo} source={fromPlaylist.LOGO_BLACK.module}/>
                <Text style={[styles.text, {fontFamily: "grenze-regular", fontSize: 24, marginTop: -10, marginBottom: 0}]}>
                    Weather for the Blind
                </Text>
                <Text style={[styles.text, {fontFamily: "grenze-regular", fontSize: 100, marginTop: -30, marginBottom: 0}]}>
                    {this.props.weather.temperature}°
                </Text>
                <Text style={[styles.text, {
                    fontFamily: "grenze-regular",
                    fontSize: 20,
                    letterSpacing: 1,
                    marginBottom: 6
                }]}>
                    New Orleans, LA
                </Text>
                <Text style={[weatherStyles.text, {fontFamily: "roboto-bold"}]}>
                    {this.state.time}
                </Text>
                <Text style={[weatherStyles.subText, {fontFamily: "roboto-bold"}]}>
                    {this.props.weather.summary}
                </Text>
                <View style={weatherStyles.container}>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Humidity
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.humidity}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Wind Speed
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.windSpeed}mph
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Percipitation
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.precipProbability}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Wind Direction
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.windBearing}
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Pressure
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.pressure}mb
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        UV Index
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
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
        marginBottom: 4,
        textAlign: 'center'
    },
    item: {
        width: '100%',
        textAlign: 'center'
    },
    subText: {
        color: 'rgba(0,0,0,1)'
    }
});
