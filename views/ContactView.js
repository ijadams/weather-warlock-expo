import React from "react";
import {
    Image,
    Text,
    View,
    StyleSheet, ScrollView
} from "react-native";
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


    render() {
        return !this.state.fontLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <View style={[aboutStyles.container, {}]}>
                <Text style={[aboutStyles.header, {}]}>
                    Contact US
                </Text>
                <Image style={aboutStyles.logo}
                       source={fromPlaylist.ICON_WARLOCK_BOARD.module}/>
                <View>
                    <Text>
                      Coming Soon.
                    </Text>
               </View>

            </View>
        )
    }
}



const aboutStyles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
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
});
