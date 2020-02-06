import React from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from "react-native";
import {styles} from '../constants';
import {Ionicons} from "@expo/vector-icons";

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");
const FONT_SIZE = 14;

export class InstrumentBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const buttonBgColor = this.props.weather.isDay ? '#000' : '#fff';
        const buttonTextColor = this.props.weather.isDay ? '#fff' : '#000';
        return (
            <View style={styles.playerContainer}>
                <View style={[barStyles.openButton, {backgroundColor: buttonBgColor}]}>
                    <Ionicons name="ios-settings" color={buttonTextColor} size={10}/>
                    <Text style={[barStyles.openButtonText, {color: buttonTextColor}]}>Instruments</Text>
                </View>
            </View>
        )
    }
}


const barStyles = StyleSheet.create({
    buttonsContainerBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openButtonText: {
        textAlign: 'center',
        fontSize: 10,
        margin: 0,
        padding: 0,
        marginTop: -2,
        paddingLeft: 4
    },
    openButton: {
        marginTop: 20,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {},
    button: {
        width: 50,
        height: 50
    }
});

