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
                <Text style={[styles.text, {fontFamily: "roboto-bold", fontSize: 75, marginBottom: 6}]}>
                    {this.props.weather.temperature}°
                </Text>
                <Text style={[styles.text, {
                    fontFamily: "roboto-regular",
                    fontSize: 15,
                    letterSpacing: 1,
                    marginBottom: 12
                }]}>
                    New Orleans, LA
                </Text>
                <Text style={[weatherStyles.text, {fontFamily: "roboto-regular"}]}>
                    Local Time: {this.state.time}
                </Text>
                <Text style={[weatherStyles.text, {fontFamily: "roboto-regular"}]}>
                    {this.props.weather.summary}
                </Text>

                <View style={weatherStyles.container}>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Humidity:
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.humidity}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Wind Speed:
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.windSpeed}mph
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Percipitation:
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.precipProbability}%
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Wind Direction:
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.windBearing}
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        Pressure:
                        <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.pressure}mb
                        </Text>
                    </Text>
                    <Text style={[weatherStyles.text, {fontFamily: "roboto-light"}]}>
                        UV Index:
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
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        maxWidth: '100%',
        height: 'auto',
        marginLeft: '2.5%',
        marginRight: '2.5%',
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
