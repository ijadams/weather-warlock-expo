import React from "react";
import {
    Text,
    View,
    StyleSheet, ScrollView
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../constants";
import * as Font from "expo-font";


export class WeatherDataView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            weather: props.weather
        };
    }

    componentDidMount() {
        (async () => {
            await Font.loadAsync({
                ...MaterialIcons.font,
                "grenze-regular": require("../assets/fonts/Grenze-Regular.ttf"),
                "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
                "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
                "roboto-light": require("../assets/fonts/Roboto-Light.ttf")
            });
            this.setState({fontLoaded: true});
        })();
    }

    render() {
        return !this.state.fontLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <View style={[weatherViewStyles.container, {}]}>
                <Text style={[weatherViewStyles.header, {}]}>
                    Conditions
                </Text>
                <ScrollView style={[weatherViewStyles.textContainer, {}]} horizontal={false}
                            showsVerticalScrollIndicator={false}>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Cloud Cover
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.cloudCover}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Humidity
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.humidity}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        UV Index
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.uvIndex}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Nearest Storm Distance
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.nearestStormDistance}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Nearest Storm Bearing
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.nearestStormBearing}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Percipitation Probability
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.precipProbability}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Percipitation Intensity
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'} {this.props.weather.currently.precipIntensity}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Visibility
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.visibility}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Wind Gust
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.windGust}
                        </Text>
                    </Text>
                    <Text style={[weatherViewStyles.text, {fontFamily: "roboto-light"}]}>
                        Cloud Cover
                        <Text style={[weatherViewStyles.subText, {fontFamily: "roboto-regular"}]}>
                            {'\n'}{this.props.weather.currently.cloudCover}
                        </Text>
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

const weatherViewStyles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
        height: '90%',
    },
    textContainer: {
        height: 600,
    },
    emptyContainer: {
        alignSelf: "stretch",
        backgroundColor: 'white'
    },
    header: {
        textAlign: 'center',
        fontSize: 41,
        color: '#000',
        textTransform: 'uppercase',
        fontFamily: "grenze-regular"
    },
    logo: {
        backgroundColor: "transparent",
        width: 140,
        height: 32,
        marginBottom: 32
    },
    text: {
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 12,
        marginRight: 12,
        marginLeft: 12
    },
    item: {
        width: '100%',
        textAlign: 'center'
    },
    subText: {
        fontSize: 14,
        color: 'rgba(0,0,0,1)'
    },
});
