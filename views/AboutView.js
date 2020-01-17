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


export class AboutView extends React.Component {
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
                    About
                </Text>
                <Image style={aboutStyles.logo}
                       source={fromPlaylist.ICON_WARLOCK_BOARD.module}/>
                <View>
                    <Text>
                       Since 2011 Quintronics – the company which brought you the Drum Buddy – has been actively developing
                       a low voltage weather controlled drone synthesizer. Base station number 1, called WEATHER WARLOCK
                       was finally finished in the Spring of 2014 at the Robert Rauschenberg Foundation in Captiva,
                       Florida. Weather Warlock evolved out of an earlier project Called Weather Witch.
                        {'\n'}{'\n'}
                        www.weatherfortheblind.org will stream sounds from this musical weather station most every day and night as a free public service. This giant analog synth and it’s weather sensors will live primarily in New Orleans Louisiana at the Spellcaster Lodge. The entire apparatus will occasionally travel as part of a live band, also called WEATHER WARLOCK or as a part of QUINTRON AND MISS PUSSYCAT.
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
