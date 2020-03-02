import React from "react";
import {
    Image,
    Text,
    View,
    StyleSheet, ScrollView
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
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
                <ScrollView style={[aboutStyles.textContainer, {}]}>
                    <Text>
                       Since 2011 Quintronics – the company which brought you the Drum Buddy – has been actively developing
                       a low voltage weather controlled drone synthesizer. Base station number 1, called WEATHER WARLOCK
                       was finally finished in the Spring of 2014 at the Robert Rauschenberg Foundation in Captiva,
                       Florida. Weather Warlock evolved out of an earlier project Called Weather Witch.
                        {'\n'}{'\n'}
                        www.weatherfortheblind.org will stream sounds from this musical weather station most every day and night as a free public service. This giant analog synth and it’s weather sensors will live primarily in New Orleans Louisiana at the Spellcaster Lodge. The entire apparatus will occasionally travel as part of a live band, also called WEATHER WARLOCK or as a part of QUINTRON AND MISS PUSSYCAT.
                        {'\n'}{'\n'}
                        A weather controlled synthesizer had long been on the books for Quintronics but it took a fairly serious health crisis and a forced “vacation” from touring to steer these sounds towards consonant drone…F major to be exact. Mental and cellular relaxation became a part of the invention process.
                        {'\n'}{'\n'}
                        This site is called “weather for the blind” in reference to a circadian rhythm sleep disorder suffered by many sight impaired persons. Our hope is that this instrument could be of some help to those experiencing any type of sleep disorder or to anyone suffering from stress or health issues which might benefit from a direct musical connection to nature. Quintronics makes NO MEDICAL CLAIMS that our instrument is physically or mentally curative. The brain is a mysterious organ with many needs. Those suffering from “Non-24″ should seek information from their doctor.  More information about “Non-24″ can be found at the NATIONAL SLEEP FOUNDATION.
                        {'\n'}{'\n'}
                        Another future mission for this endeavor is that more base stations be built around the world so that listeners may experience musical interpretations of a variety of different climates and time zones – from Iceland to the Amazon. Please contact rhinestonerecords@hotmail.com if your museum, school, or private institution would be interested in commissioning a custom base station.
                        {'\n'}{'\n'}
                        Occasionally weatherfortheblind.org will broadcast other sounds, stories, and special events.  We will also invite guests manipulators to come and jam on the base station knobs and communicate with the weather gods for our listening pleasure. Thanks for visiting and please enjoy.
                        {'\n'}{'\n'}
                        This project would not have been possible without the assistance of the Robert Rauschenberg Foundation, New Orleans Airlift, Tulane University, artist / engineer Mars Brown, Rami (Ballzack) Sharkey, and the ever brilliant advice of Miss Pussycat.
                    </Text>
               </ScrollView>
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
    textContainer: {
        height: 0,
        overflow: 'hidden',
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
