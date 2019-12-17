import React from "react";

import {StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import {HomeView} from './views/HomeView';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} bounces={false}>

                <View style={styles.homeView}>
                        <HomeView></HomeView>
                    </View>

                    <View style={styles.secondView}>
                        <Text style={styles.headerText}>Second View</Text>
                    </View>

                    <View style={styles.thirdView}>
                        <Text style={styles.headerText}>Third View</Text>
                    </View>

                    <View style={styles.forthView}>
                        <Text style={styles.headerText}>Forth View</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    homeView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    thirdView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#3F51B5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    forthView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

});
