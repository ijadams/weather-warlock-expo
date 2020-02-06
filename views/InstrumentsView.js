import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from "react-native";
import {Asset} from "expo-asset";
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
        let tracks = [
            {title: 'Bubble', path: Asset.fromModule(require('../assets/audio/bubble.mp3')).uri},
            {title: 'Fire', path: Asset.fromModule(require('../assets/audio/fire.mp3')).uri},
            {title: 'German', path: Asset.fromModule(require('../assets/audio/german.mp3')).uri},
            {title: 'Heartbeat', path: Asset.fromModule(require('../assets/audio/heartbeat.mp3')).uri},
            {title: 'Jungle', path: Asset.fromModule(require('../assets/audio/jungle.mp3')).uri},
            {title: 'Morse', path: Asset.fromModule(require('../assets/audio/morse.mp3')).uri},
            {title: 'White Noise', path: Asset.fromModule(require('../assets/audio/white.mp3')).uri},
            {title: 'Tabla', path: Asset.fromModule(require('../assets/audio/tabla.mp3')).uri},
            {title: 'Radar Moon', path: Asset.fromModule(require('../assets/audio/radar-moon.mp3')).uri},
            {title: 'Record Noise', path: Asset.fromModule(require('../assets/audio/needle.mp3')).uri},
        ];
        tracks = tracks.sort((a, b) => (a.title > b.title) ? 1 : -1);
        return !this.state.fontLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <View style={instrumentStyles.container}>
                <View style={instrumentStyles.titleContainer}>
                    <Text style={instrumentStyles.header}>Instrument Board</Text>
                </View>
                <ScrollView style={instrumentStyles.scrollContainer} alwaysBounceVertical={false} horizontal={false}>
                    {tracks.map((track, i) => {
                        return (
                            <InstrumentPlayer key={i} title={track.title} path={track.path}
                                              last={i + 1 === tracks.length}/>
                        )
                    })}
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
