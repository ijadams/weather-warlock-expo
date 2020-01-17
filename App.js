import React from "react";

import {StyleSheet, Text, View, ScrollView, Dimensions, DeviceEventEmitter} from 'react-native';

import {HomeView} from './views/HomeView';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pageScroll: true
        }
    }


    componentDidMount() {
        DeviceEventEmitter.addListener("event.weatherScroll", (e) => {
            this.setState({pageScroll: false});
            setTimeout(() => {
                this.setState({pageScroll: true});
            }, 350)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} scrollEnabled={this.state.pageScroll} pagingEnabled={true} showsHorizontalScrollIndicator={false}
                            bounces={false}>

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
