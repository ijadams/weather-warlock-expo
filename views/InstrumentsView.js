import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView
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
                <View style={instrumentStyles.titleContainer}>
                    <Text style={instrumentStyles.header}>Instrument Board</Text>
                </View>
                <ScrollView style={instrumentStyles.scrollContainer} alwaysBounceVertical={false} horizontal={false}>
                    <InstrumentPlayer title={'Radar Moon'} path={'https://weather-warlock.s3.amazonaws.com/radar-moon.wav'}/>
                    <InstrumentPlayer last={true} title={'Record Noise'} path={'https://weather-warlock.s3.amazonaws.com/needle.wav'}/>
                </ScrollView>
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
        height: '100%',
        width: '100%',
    },
    titleContainer: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: 20,
        alignSelf: 'flex-start'
    },
    scrollContainer: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'red'
    },
    header: {
        fontFamily: "grenze-regular",
        fontSize: 24,
        width: '100%',
        textAlign: 'center'
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
