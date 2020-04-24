import React from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import {styles} from '../constants';


export class TextBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const buttonBgColor = this.props.weather.isDay ? '#000' : '#fff';
        const buttonTextColor = this.props.weather.isDay ? '#fff' : '#000';
        return (
            <View style={styles.playerContainer}>
                <View style={[barStyles.openButton, {backgroundColor: buttonBgColor, borderColor: buttonTextColor}]}>
                    <Text style={[barStyles.openButtonText, {color: buttonTextColor}]}>CURRENT CONDITIONS</Text>
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
        fontSize: 14,
        fontWeight: 500,
        paddingLeft: 4,
        paddingRight: 4,
        letterSpacing: 0.2
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
        alignItems: 'center',
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.58,
        shadowRadius: 4.00,
        elevation: 8,
    },
    wrapper: {},
    button: {
        width: 50,
        height: 50
    }
});

