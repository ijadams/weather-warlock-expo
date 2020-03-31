import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList, TouchableOpacity, DeviceEventEmitter
} from "react-native";
import {Asset} from "expo-asset";
import {MaterialIcons} from "@expo/vector-icons";
import {PLAYLIST} from '../constants/player.const';
import {DEVICE_HEIGHT, styles} from "../constants";
import * as Font from "expo-font";

export class ArchivesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            activeTrack: null
        };
    }

    componentDidMount() {
        this.setState({activeTrack: this.props.activeTrack});
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeTrack !== prevProps.activeTrack) {
            this.setState({activeTrack: this.props.activeTrack});
        }
    }

    _emitEvent(title) {
        DeviceEventEmitter.emit('event.archive', title);
    }


    render() {
        const tracks = [
            {title: 'Live Stream', path: PLAYLIST[0].uri},
            {title: 'Sleep', path: Asset.fromModule(require('../assets/audio/sleep.mp3')).uri},
            {title: 'Relax', path: Asset.fromModule(require('../assets/audio/relax.mp3')).uri},
            {title: 'Work', path: Asset.fromModule(require('../assets/audio/work.mp3')).uri},
            {title: 'Storm', path: Asset.fromModule(require('../assets/audio/storm.mp3')).uri},
            {title: 'Sunrise', path: Asset.fromModule(require('../assets/audio/sunrise.mp3')).uri},
        ];
        const activeTrack = this.state.activeTrack;

        return !this.state.fontLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <View style={archivesStyles.container}>
                <View style={archivesStyles.titleContainer}>
                    <Text style={archivesStyles.header}>Archives</Text>
                </View>
                <View style={archivesStyles.bodyContainer}>
                    <Text style={archivesStyles.body}>Play pre-recorded sessions of the Weather Warlock.</Text>
                </View>
                <View style={archivesStyles.mainContainer}>
                    <FlatList
                        data={tracks}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={archivesStyles.list}
                        renderItem={({item, i}) =>
                            <View key={i} style={archivesStyles.buttonContainer}>
                                <TouchableOpacity onPress={() => this._emitEvent(item.title)} disabled={activeTrack === item.title}>
                                    <Text style={[archivesStyles.button, activeTrack === item.title ? archivesStyles.buttonActive : {}]}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}


const archivesStyles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '90%',
        width: '100%',
    },
    list: {
        justifyContent: 'center',
    },
    titleContainer: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: 20,
        alignSelf: 'flex-start'
    },
    bodyContainer: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: 20,
        paddingLeft: "5%",
        paddingRight: "5%",
        alignSelf: 'flex-start',
    },
    mainContainer: {
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
    body: {
        fontSize: 14,
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
    buttonContainer: {},
    button: {
        backgroundColor: '#e0e0e0',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        color: 'black',
        fontSize: 18,
        fontWeight: '300',
        letterSpacing: 1,
        overflow: 'hidden',
        padding: 20,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        textTransform: 'lowercase'
    },
    buttonActive: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 1,
    }
});
