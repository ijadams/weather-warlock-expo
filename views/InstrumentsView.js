import React from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {DEVICE_HEIGHT, styles} from "../constants";
import * as Font from "expo-font";
import {InstrumentPlayer} from "../components";


export class InstrumentsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
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
            <View style={instrumentStyles.container}>
                <Text style={instrumentStyles.header}>Instruments</Text>
                <InstrumentPlayer title={'Radar Moon'} path={'https://weather-warlock.s3.amazonaws.com/radar-moon.wav'}/>
                <InstrumentPlayer last={true} title={'Record Noise'} path={'https://weather-warlock.s3.amazonaws.com/needle.wav'}/>
            </View>
        )
    }
}



const instrumentStyles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: DEVICE_HEIGHT - 40,
        width: '100%',
    },
    header: {
        fontFamily: "grenze-regular",
        fontSize: 24,
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        top: 20
    },
    emptyContainer: {
        alignSelf: "stretch",
        backgroundColor: 'white'
    },
    logo: {
        backgroundColor: "transparent",
        width: 140,
        height: 32,
        marginBottom: 32
    },
});
