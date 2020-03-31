import React from "react";
import {
    Image,
    Text,
    Button,
    View,
    StyleSheet,
    Linking,
    TouchableOpacity
} from "react-native";
import {WebBrowser} from 'expo';
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../constants";
import * as fromPlaylist from "../constants/player.const";
import * as Font from "expo-font";


export class ContactView extends React.Component {
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

    _donate = () => {
        Linking.openURL('https://www.paypal.com/donate/?token=kDbBOFrQKyPNjFDQKBgTO8fieRdEF3yPnr747iv4lMI7l3h39NdIlG6JOxHrLs6eVbIClW&fromUL=true&country.x=US&locale.x=en_US');
    }

    _email = () => {
        Linking.openURL('mailto:rhinestonerecords@hotmail.com');
    }

    render() {
        return !this.state.fontLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <View style={[contactStyles.container, {}]}>
                <Text style={[contactStyles.header, {}]}>
                    Contact US
                </Text>
                <Image style={contactStyles.logo}
                       source={fromPlaylist.ICON_WARLOCK_BOARD.module}/>
                <Text style={[contactStyles.body, {}]}>
                    Please contact rhinestonerecords@hotmail.com if your museum, school, or private institution would be interested in commissioning a custom base station.
                </Text>
                <View style={contactStyles.containerB}>
                    <View style={contactStyles.buttonContainer}>
                        <TouchableOpacity onPress={this._donate}>
                            <Text style={contactStyles.button}>donate</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={contactStyles.buttonContainer}>
                        <TouchableOpacity onPress={this._email}>
                            <Text style={contactStyles.button}>email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const contactStyles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    containerB: {
        marginTop: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
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
    body: {
        textAlign: 'center',
    },
    logo: {
        backgroundColor: "transparent",
        width: 140,
        height: 32,
        marginBottom: 32
    },
    button: {
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    }
});
